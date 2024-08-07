import SvgIcons from '../../../../assets/generatedIcons/SvgIcons';

type Props = {
    icon: string | null;
    width?: number;
    height?: number;
    fill?: string;
    stroke?: string;
};

const Icon = ({ icon, width, height, fill, stroke }: Props) => {
    const func = (str: string | null) => {
        if (str === null) return;
        const shortString = str?.replace(/icomoon icon-|svgicon|/g, '');
        const shorterString = shortString?.replace(' ', '');
        const characters = shorterString?.split('');

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
        return formattedString.replace(/\s*$/, '');
    };

    return (
        <SvgIcons
            // @ts-ignore
            icon={func(icon)}
            width={width}
            height={height}
            stroke={stroke}
            fill={fill}
        />
    );
};

export default Icon;
