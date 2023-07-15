// Order of object is: motorcycle:1 salon_mini:2 salon_maxi:3 suv_jeep:4 coaster_bus:5 truck:6
// Order of array is: 
// private_3rd_party_insurance | private_no_insurance | commercial_3rd_party_insurance | commercial_no_insurance
// const new_papers = {
//     1: [ 69500, 59500, 72700, 62700 ],
//     2: [ 62000, 53000, 66000, 63400, 300000 ],
//     3: [ 63000, 54000, 67000, 64400, 310000 ],
//     4: [ 65000, 57000, 70000, 70500, 310000 ],
//     5: [ 80500, 70500, 80000, 90500 ],
//     6: [ 174500, 164500, 80000, 154500 ],
// }
const new_papers = {
    1: [ 69500, 72700, null ],
    2: [ 62000, 66000, 300000 ],
    3: [ 63000, 67000, 310000 ],
    4: [ 65000, 70000, 310000 ],
    5: [ 80500, 80000, null],
    6: [ 174500, 80000, null],
}

// increment on vehicle_license with 3400
const renew_papers = {
    vehicle_license: 3400,
    road_worthiness: 5200,
    third_party_insurance: 20000,
    hackney_permit: 4900,
    heavy_duty_permit: 9750,
    local_government_permit_nigeria: 23500,
    local_government_permit_southwest: 17500,
    state_carriage_permit: 13500,
    og_hut: 4000,
    truck_trailer_permit: 6000,
    mid_year_permit: 4700
}

//Order of object: 1: Salon Car Mini(1.4 - 1.7) e.g Picanto Corolla | 2: Salon Car Mini(2.0 - 2.6) e.g Camry, Benz, Accord | 3: SUV,JEEP,BUS,PICKUP |4: Truck Tipper/Trailer |5: Coaster Bus

//Order of array Vehicle license | Road Worthiness | Insurance | Hackney Permit | Local Governmanet Permit | Heavy Duty | Truck and Trailer Permit

const private_vehicle = {
    1: [ 2500, 4500, 15000, 2300, 15000, null, null ],
    2: [ 3000, 5000, 15000, 2500, 15000, null, null ],
    3: [ 4000, 6000, 15000, null, 15000, null, null ],
    4: [ 6000, null, null, 4500, 20000, 5000, 50000 ],
    5: [ 4000, 6500, 15000, 4000, 15000, null, null]
}

const commercial_vehicle = {
    1: [ 2500, 4000, 20000, 2300, 15000, null, null ],
    2: [ 3000, 4500, 20000, 2500, 15000,  null, null ],
    3: [ 4000, 5500, 20000, null, 15000,  null, null ],
    4: [ 6000, null, null, 4500, 20000, 5000, 50000 ],
    5: [ 4000, 6000, 20000, 4000, 15000, null, null]
}


// Order of array is: private | commercial 
const change_of_ownership = {
    change_of_ownership: [ 86000, 95900 ],
    change_of_ownership_existing: [ 7100, 80900 ],
    personalized_custom_number: 305000
}

// Order of object is: uber_taxify_ridehailng | private | commercial
// vehicle price x ratio(below) = final amount
const comprehensive_insurance = {
    1: 0.03,
    2: 0.025,
    3: 0.035
}

// Order of object is: national_3_years_validity | national_5_years_validity | international_1_year
const driver_license = {
    1: 21000,
    2: 26000,
    3: 18000
}

// Order of object is: riders_card:1 | federal_mid_year_truck_permit:2 | reprint_police_cmr:3
// light_duty_permit:4 | change_of_vehicle_engine:5 | heavy_and_light_duty_permit:6
// auto_reg_database:7 | reprint_regular_number_plate:8 | reprint_customized_number_plate:9
const other_permits = {
    1: 7500,
    2: 3500,
    3: 4000,
    4: 5000,
    5: 10500,
    6: 4000,
    7: 9500,
    8: 33000,
    9: 80000
}












                                           
let total_price = 0
let x1 = 0
let x2 = 0

// ============================================================================//

const mountTotal = (total) => {
    let x = document.querySelector('input[type=submit]')
    x.value = `Start Processing(₦${total})`
    let y = document.getElementById('amount')
    y.value = total
}


// NEW VEHICLE PAPERS

const newPapers = (v1, v2) =>  {
    console.log("v1 = " + v1 + "v2 = " + v2)
    if (v1) x1 = v1
    if (v2) x2 = v2
    total_price = new_papers[x1 || v1][x2 || v2]
    mountTotal(total_price)
}

// RENEW VEHICLE PAPERS
const licensePrice = (y) => {
    let multiple = document.getElementById('demoInput1').value
    console.log(multiple);
    if (y === 'input_box') multiple + 1
    return renew_papers.vehicle_license * multiple
}

const renewPapers = (e, x, y) => {
    let collated_price = 0
    let license_price = 0

    // COLLATED PRICE 
    if (e.target.checked === true) {
        collated_price += renew_papers[x]
    } else if (e.target.checked === false) {
        collated_price -= renew_papers[x]
    }

    // LICENSE PRICE
    if (y) {
        console.log('irannnnna')
        license_price = licensePrice(y)
    }
    // if (y === 'add') {
    //     console.log('added');
    //     license_price += renew_papers.vehicle_license
    //     console.log(license_price);
    // } else if (y === 'sub') {
    //     if (multiple > 1) {
    //         console.log('subbed');
    //         license_price -= renew_papers.vehicle_license
    //     }
    // } else if (y === 'input_box') {
    //     console.log('input_box');
    //     let multiple = document.getElementById('demoInput1').value
    //     license_price = renew_papers.vehicle_license * multiple
    // }
    // TOTAL PRICE
    total_price = collated_price + license_price

    mountTotal(total_price)
}

// DRIVER LICENSE

const driverLicense = (x) =>  {
    total_price = driver_license[x]
    mountTotal(total_price)
}

// COMPREHENSIVE INSURANCE

const comprehensiveInsurance = (x) => {
    if (x) x1 = x
    if (x1) {
        let ratio = document.getElementById('vehicle_price').value
        total_price = Math.ceil(comprehensive_insurance[x1] * ratio)
        mountTotal(total_price)
    }
}

// OTHER PERMITS

const otherPermits = (x) => {
    total_price = other_permits[x]
    mountTotal(total_price)
}
