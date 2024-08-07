export type App = {
    stack: 'login' | 'authenticated' | 'dealership' | 'language';
    domain: string;
    token: string;
    appraisal: string;
    searchWord: string;
    language: string;
    dealerships: [Dealership] | [];
    appraisalDeletedModalVisibility: boolean;
    photoUploadingList: [];
    uploadServiceEnabled: true;
};

export type Vehicle = {
    vehicle_id: string;
    vehicle_vin: string;
    vehicle_stock: null;
    vehicle_odometer: null;
    vehicle_year: string;
    brand_name: string;
    model_name: string;
    trim_name: string;
    __count: number;
};

export type Dealership = {
    type: string;
    link: string;
    dealership: string;
    logo: string;
};

//   https://app.novosteer.me/api/
