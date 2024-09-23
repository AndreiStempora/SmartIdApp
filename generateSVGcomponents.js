// change the path to the folder where you have your svg icons

//folder structure assets/icons/icomoon
//                             /svgicons
// node generateSVGcomponents.js

const { kStringMaxLength } = require('buffer');
const fs = require('fs');
const path = require('path');

const iconsFilePath = './assets/icons';
const destinationFilePath = './assets/generatedIcons';

const modifySVG = svgContent => {
    return svgContent.replace(
        /<(\/?)([a-z]+)([^>]*)>/gi,
        (match, isClosingTag, tagName, attributes) => {
            const capitalizedTag = `<${isClosingTag}${
                tagName.charAt(0).toUpperCase() + tagName.substring(1)
            }${attributes}>`;
            return capitalizedTag;
        }
    );
};

const editProps = svgContent => {
    return svgContent.replace(/<([^>]+)>/g, (match, props) => {
        let newProps = props.replace(
            / ([^=]+)="([^"]+)"/g,
            (match, propName, propValue) => {
                const newPropName = propName.replace(
                    /-([a-z])/g,
                    (match, letter) => {
                        return letter.toUpperCase();
                    }
                );
                return `\n${newPropName}="${propValue}"`;
            }
        );
        const oldWidth = extractValueFromString(newProps, 'width');
        newProps = newProps.replace(
            /width="[^"]+"/,
            `width={width ? width:'${oldWidth}'}`
        );
        const oldHeight = extractValueFromString(newProps, 'height');
        newProps = newProps.replace(
            /height="[^"]+"/,
            `height={height ? height:'${oldHeight}'}`
        );
        const oldStroke = extractValueFromString(newProps, 'stroke');
        newProps = newProps.replace(
            /stroke="[^"]+"/g,
            `stroke={stroke ? stroke:'${oldStroke}'}`
        );
        const oldFill = extractValueFromString(newProps, 'fill');
        if (oldFill && oldFill !== 'none') {
            newProps = newProps.replace(
                /fill="[^"]+"/,
                `fill={fill ? fill:'${oldFill}'}`
            );
        }
        const oldXmlns = extractValueFromString(newProps, 'xmlns');
        if (oldXmlns) {
            newProps = newProps.replace(
                /xmlns="[^"]+"/,
                `// @ts-ignore\nxmlns="${oldXmlns}"`
            );
        }
        newProps = newProps.replace(/(\n)/g, (match, newLine) => {
            return `${newLine}\t\t`;
        });
        return `<${newProps}>`;
    });
};

function extractValueFromString(content, value) {
    const regex = new RegExp(`${value}="([^"]+)"`);
    const match = content.match(regex);
    return match ? match[1] : null;
}

const getSvgTags = svgContent => {
    const tagNames = new Set();
    svgContent.replace(
        /<(\/*)([a-z]+)([^>]*)>/gi,
        (match, isClosingTag, tagName) => {
            tagNames.add(tagName);
            return match;
        }
    );
    const arr = Array.from(tagNames);
    const newArr = arr.filter(tag => tag !== 'Svg');
    return newArr.join(', ');
};

const componentTemplate = (svgName, svgContent, svgTags) => {
    return `import React from 'react';
import Svg, {${svgTags}} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const ${svgName} = ({width,height,stroke,fill}:Props) => {
    return (
        ${svgContent}
    )
}
export default ${svgName};`;
};

const generateImports = files => {
    let imports = '';
    files.forEach(file => {
        imports += `import ${file} from './${file}';\n`;
    });
    return imports;
};

const generateIconTypes = fileNames => {
    let str = '';
    fileNames.forEach((file, i) => {
        str += `'${file}' ${i < fileNames.length - 1 ? '| ' : '| string ;'}`;
    });
    return str;
};

const generateIfStatements = fileNames => {
    let str = '';
    fileNames.forEach(file => {
        str += ` if (icon === '${file}') {
            return (
                <${file}
                    width={width}
                    height={height}
                    stroke={stroke}
                    fill={fill}
                />
            )
        }
        `;
    });
    return str;
};

const iconsImporterTemplate = fileNames => {
    return `import React from 'react';\n${generateImports(fileNames)}
type Props = {
    icon: ${generateIconTypes(fileNames)}
    width?: number;
    height?: number;
    fill?: string;
    stroke?: string;
};

const SvgIcons = ({ icon, width, height, stroke, fill }: Props) => {

    ${generateIfStatements(fileNames)}
    
    return <></>;
};

export default SvgIcons;`;
};

const readGeneratedComponents = async (destinationSVGPath, forbiddenFile) => {
    const components = await readDirAndReturnSVGs(destinationFilePath);
    const comp = components.filter(item => item !== forbiddenFile);
    const newComponents = comp.map(component =>
        component.replace(/\.tsx$/, '')
    );
    return iconsImporterTemplate(newComponents);
};

const formatFileNames = stringArray => {
    let fileNames = [];
    stringArray.forEach(string => {
        fileNames.push(formatString(string));
    });
    return fileNames;
};

const formatString = str => {
    const characters = str.split('');

    for (let i = 0; i < characters.length; i++) {
        if (characters[i] === '-') {
            characters.splice(i, 1);
            if (i < characters.length) {
                characters[i] = characters[i].toUpperCase();
            }
        } else if (i === 0 && /^[a-z]$/.test(characters[i])) {
            characters[i] = characters[i].toUpperCase();
        }
    }

    const formattedString = characters.join('');
    return formattedString.replace(/\..*$/, '');
};

const insertFillOption = str => {
    const titleTagRegex = /<Title\b[^>]*>(.*?)<\/Title>/i;
    const titleTag2Regex = /<title\b[^>]*>(.*?)<\/title>/i;
    let newString = '';
    const titleTagsExist = titleTagRegex.test(str);
    const titleTags2Exist = titleTag2Regex.test(str);

    const textToInsert = " fill={fill ? fill:'black'}";

    if (titleTagsExist || titleTags2Exist) {
        console.log('this was true');
        newString = str.replace(/<Path[^>]*>/g, match => {
            return match.replace('>', textToInsert + '>');
        });
    } else {
        newString = str;
    }

    newString.replace('version="1.1"', '');
    console.log('--------', newString);
    return newString;
};

const removeCommentsFromString = str => {
    // console.log(str,'1');
    const newStr = str.replace(/<!--[\s\S]*?-->/g, '');
    // console.log(newStr,"2");
    const evenNewerStr = insertFillOption(newStr);
    // console.log(evenNewerStr,'3');
    return evenNewerStr.replace(/<Title>[\s\S]*?Title>/g, '');
};

const readDirAndReturnSVGs = async folderPath => {
    return new Promise((resolve, reject) => {
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            const svgFiles = files.filter(
                file =>
                    path.extname(file).toLowerCase() === '.svg' ||
                    path.extname(file).toLowerCase() === '.tsx'
            );
            resolve(svgFiles);
        });
    });
};

const determineMissingSVGs = async () => {
    const icons = await readDirAndReturnSVGs(iconsFilePath);
    const components = await readDirAndReturnSVGs(destinationFilePath);
    const missingSVGs = [];
    icons.forEach(icon => {
        if (!formatFileNames(components).includes(formatString(icon))) {
            missingSVGs.push(icon);
        }
    });
    return missingSVGs;
};

const getSVGString = async svg => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(iconsFilePath, svg);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data.toString());
        });
    });
};

const createNewComponent = (svgString, svg, destinationPath) => {
    const modifiedSvg = modifySVG(svgString);
    const modifiedSvg2 = removeCommentsFromString(modifiedSvg);
    const modifiedSvg3 = editProps(modifiedSvg2);
    // console.log("1:",modifiedSvg,"2:",modifiedSvg2,"3:",modifiedSvg3)
    const tags = getSvgTags(modifiedSvg3);
    const newFileName = formatString(svg);
    const template = componentTemplate(
        newFileName.replace('.svg', ''),
        modifiedSvg3,
        tags
    );
    fs.writeFile(`${destinationPath}/${newFileName}.tsx`, template, err => {
        if (err) {
            throw err;
        }
    });
};

const findOrCreateFile = async str => {
    const data2 = await readGeneratedComponents(destinationFilePath, str);
    fs.readdir(destinationFilePath, (err, data) => {
        if (err) {
            console.log(err);
        }
        const filePath = path.join(destinationFilePath, str);
        fs.writeFile(filePath, data2, err => {
            if (err) {
                console.log(err);
            }
        });
    });
};

(async () => {
    let missingSvgArray = await determineMissingSVGs();

    missingSvgArray.forEach(async svg => {
        let svgString = await getSVGString(svg);
        createNewComponent(svgString, svg, destinationFilePath);
    });

    await findOrCreateFile('SvgIcons.tsx');
})();
