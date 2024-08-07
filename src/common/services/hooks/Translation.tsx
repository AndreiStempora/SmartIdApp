const translation = {
    placeholder: {
        title: 'Coming Soon',
        text: 'This Feature will be available in a future release!',
    },
    dealerships: {
        title: 'Dealerships',
        button: 'add dealership',
        text: 'Franchised car dealerships are the front line for car manufacturers to get their products on the road.',
        modals: {
            delete: {
                title: 'Are you sure you want to delete this dealership?',
                content: 'This action cannot be undone.',
                buttons: {
                    yes: 'Yes',
                    no: 'No',
                },
            },
        },
    },
    dealershipScanner: {
        text: 'Please scan the QR code of the dealership.',
        modals: {
            error: {
                title: 'Couldn’t detect a dealership',
                text: 'Please try again.',
                button: 'OK',
            },
            duplicate: {
                title: 'Dealership already added',
                text: 'Duplicate dealership found, not adding the new item.',
                button: 'OK',
            },
        },
    },
    login: {
        formErrorTitle: 'Login Error',
        formErrorButton: 'Close',
        formErrorText: 'Please complete all the required fields.',
        signIn: 'Sign In',
        backToDealership: 'Back to Dealership',
        formFields: {
            user: 'Username / Email',
            password: 'Password',
        },
    },
    dashboard: {
        title: 'Dashboard',
        buttons: {
            scan: 'Scan Vin',
            browse: 'Browse Appraisals',
            select: 'Select Vehicle',
            help: 'Help',
        },
    },
    profile: {
        title: 'Profile',
        list: {
            language: 'Language',
            support: 'Support',
            upload: 'Upload Method',
            logout: 'Logout',
        },
        modals: {
            confirmLogout: {
                title: 'Are you sure you want to Logout?',
                text: 'You are about to be logged out. This way you can also change domain.',
                buttons: {
                    no: 'No',
                    yes: 'Yes',
                },
            },
            changeUploadMethod: {
                title: 'Change Upload Method?',
                text: 'If your app crashes with the current upload method, change it here. If it crashes when you change it than the change will not take effect, and you should not try again before the next update.',
                buttons: {
                    yes: 'Yes',
                    no: 'No',
                },
            },
        },
    },
    scanVin: {
        title: 'Scan VIN',
        dealership: 'Dealership',
        vin: 'VIN',
        odometer: 'Odometer',
        distanceUnit: 'Km',
        button: 'Continue',
        scannerText: 'Please scan the barcode of the vehicle.',
        modals: {
            vinError: {
                title: 'Error',
                text: 'The vin you provided is not valid, or can not be decoded! Would you like to manually create the appraisal?',
                buttons: { ok: 'OK', cancel: 'Cancel' },
            },
        },
    },
    details: {
        title: 'Appraisal Details',
        sections: {
            images: 'Images',
            info: 'Appraisal Info',
            market: 'Market',
            obd: 'Vehicle Diagnostic',
            recon: 'Recon Options',
            client: 'Client Info',
            trims: 'Change Trim',
            options: 'Vehicle Options',
        },
        modals: {
            error: {
                title: 'Error!',
                text: 'You can no longer access this appraisal!',
                button: 'OK',
            },
        },
    },
    images: {
        title: 'Images',
        emptyListText:
            'There are no pictures yet. Please upload / take at least 12 photos.',
        buttons: {
            continue: 'Continue',
            upload: 'Upload More Photos',
        },
    },
    camera: {
        text: 'Please turn the device to the left to take pictures',
    },
    info: {
        title: 'Appraisal Info',
        source: 'Source',
        notes: 'Notes',
        button: 'Save',
    },
    trims: {
        title: 'Trims',
        button: 'Continue',
    },
    options: {
        title: 'Options',
        button: 'Continue',
    },
    client: {
        title: 'Client Details',
        button: 'Continue',
    },
    recon: {
        title: 'Recon Options',
        modals: {
            item: {
                state: 'state',
                emptyListText:
                    'There are no pictures yet. Please upload / take at least 1 photo.',
                buttons: {
                    close: 'Close',
                    upload: 'Upload More Photos',
                },
            },
        },
    },
    appraisals: {
        title: 'Browse Appraisals',
        searchPlaceholder: 'Search Name, Stock, VIN',
    },
    language: {
        title: 'Language',
        button: 'Select Language',
    },
    help: {
        title: 'Contact Support',
        form: {
            screen: 'Screen',
            error: 'Error',
            button: 'Send Message',
        },
        contentTitle: 'Market Appraisal App by Novosteer',
        contentText:
            'Use the camera to capture the vehicle VIN or use pre-filled dropdown list forms to enter your vehicle.',
        footerText: '© 2024 Novosteer. All rights reserved.',
        modals: {
            success: {
                title: 'Message Sent',
                text: 'Your message has been sent successfully. We will get back to you as soon as possible.',
                button: 'OK',
            },
            error: {
                title: 'Error',
                text: 'An error occurred while sending the message. Please try again later.',
                button: 'OK',
            },
        },
    },
    selectVehicle: {
        title: 'Select Vehicle',
        form: {
            dealership: 'Dealership',
            year: 'Year',
            make: 'Make',
            model: 'Model',
            trim: 'Trim',
            odometer: 'Odometer',
            distanceUnit: 'Km',
        },
        button: 'Continue',
    },
    pageError: {
        title: 'An error occurred while loading the page.',
        noNetwork:
            'No network connection! Connect to the internet and try again.',
        button: 'Send Report',
        reference:
            'A report of this error has been sent to the developer! Reference number: ',
    },
};

export default translation;
