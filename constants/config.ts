export const Config = {
    server: "http://www.vinhdanh.vn/catholic-api/",
};

// 1. Catholic
export const Catholic = {
    create: "Catholic/Create",
    getById: "Catholic/GetById",
    getByBookId: "Catholic/GetByBookId",
    update: "Catholic/Update",
    delete: "Catholic/Delete",
};

// 2. CatholicEvent
export const CatholicEvent = {
    create: "CatholicEvent/Create",
    getById: "CatholicEvent/GetById",
    getByChurchId: "CatholicEvent/GetByChurchId",
    update: "CatholicEvent/Update",
    getByCatholicId: "CatholicEvent/GetByCatholicId",
    delete: "CatholicEvent/Delete",
    getByEventTypeId: "CatholicEvent/GetByEventTypeId"
};

// 3. Church
export const Church = {
    getChurchList: "Church/GetChurchList",
    getById: "Church/GetById",
    create: "Church/Create",
    update: "Church/Update",
    delete: "Church/Delete",
};

// 4. CatholicBook
export const CatholicBook = {
    create: "CatholicBook/Create",
    getById: "CatholicBook/GetById",
};

// 5. EventType
export const EventType = {
    getAll: "EventType/GetAll",
    create: "EventType/Create",
    getById: "EventType/GetById",
    delete: "EventType/Delete",
    update: "EventType/Update",
};

// 6. Parish
export const Parish = {
    create: "Parish/Create",
    update: "Parish/Update",
    delete: "Parish/Delete",
    getAll: "Parish/GetAll",
    getById: "Parish/GetById",
    getByDeaneryId: "Parish/GetByDeaneryId",
};

// 7. Deanery
export const Deanery = {
    create: "Deanery/Create",
    update: "Deanery/Update",
    delete: "Deanery/Delete",
    getById: "Deanery/GetById",
    getByDioceseId: "Deanery/GetByDioceseId",
};

// 8. Diocese
export const Diocese = {
    create: "Diocese/Create",
    update: "Diocese/Update",
    delete: "Diocese/Delete",
    getById: "Diocese/GetById",
    getAll: "Diocese/GetAll",
};

// 9. Saint
export const Saint = {
    create: "Saint/Create",
    update: "Saint/Update",
    delete: "Saint/Delete",
    getById: "Saint/GetById",
    getAll: "Saint/GetAll",
};

// 10. EthnicMinority
export const EthnicMinority = {
    create: "EthnicMinority/Create",
    update: "EthnicMinority/Update",
    delete: "EthnicMinority/Delete",
    getById: "EthnicMinority/GetById",
    getAll: "EthnicMinority/GetAll",
};

// 11. Congregation
export const Congregation = {
    create: "Congregation/Create",
    update: "Congregation/Update",
    delete: "Congregation/Delete",
    getById: "Congregation/GetById",
    getAll: "Congregation/GetAll",
};

// 12. CongregationActivity
export const CongregationActivity = {
    create: "CongregationActivity/Create",
    update: "CongregationActivity/Update",
    delete: "CongregationActivity/Delete",
    getById: "CongregationActivity/GetById",
    getAll: "CongregationActivity/GetAll",
    getByCongregationId: "CongregationActivity/GetByCongregationId"
};

// 13. ChurchCongregationActivity
export const ChurchCongregationActivity = {
    create: "ChurchCongregationActivity/Create",
    update: "ChurchCongregationActivity/Update",
    delete: "ChurchCongregationActivity/Delete",
    getById: "ChurchCongregationActivity/GetById",
    getAll: "ChurchCongregationActivity/GetAll",
    getByChurchId: "ChurchCongregationActivity/GetByChurchId"
};

// 14. CatholicCongregationActivity
export const CatholicCongregationActivity = {
    create: "CatholicCongregationActivity/Create",
    update: "CatholicCongregationActivity/Update",
    delete: "CatholicCongregationActivity/Delete",
    getById: "CatholicCongregationActivity/GetById",
    getAll: "CatholicCongregationActivity/GetAll",
    getByCatholicId: "CatholicCongregationActivity/GetByCatholicId"
};

// 15. ChurchEvent
export const ChurchEvent = {
    create: "ChurchEvent/Create",
    update: "ChurchEvent/Update",
    delete: "ChurchEvent/Delete",
    getById: "ChurchEvent/GetById",
    getAll: "ChurchEvent/GetAll",
    getByChurchId: "ChurchEvent/GetByChurchId",
};