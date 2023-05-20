// Order of object is: motorcycle:1 salon_midi:2 salon_maxi:3 suv_jeep:4 coaster_bus:5 truck:6
// Order of array is: 
// private_3rd_party_insurance | private_no_insurance | commercial_3rd_party_insurance | commercial_no_insurance
const new_papers = {
    1: [ 69500, 59500, 72700, 62700 ],
    2: [ 63000, 53000, 73400, 63400 ],
    3: [ 64000, 54000, 74400, 64400 ],
    4: [ 67000, 57000, 80500, 70500 ],
    5: [ 80500, 70500, 95000, 90500 ],
    6: [ 174500, 164500, 174500, 154500 ],
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
// Order of array is: private | commercial 
const change_of_ownership = {
    change_of_ownership: [ 86000, 95900 ],
    change_of_ownership_existing: [ 7100, 80900 ]
}
// vehicle price x ratio(below) = final amount
const comprehensive_insurance = {
    uber_taxify_ridehailng: 0.03,
    private: 0.025,
    commercial: 0.035
}
const driver_license = {
    national_3_years_validity: 21000,
    national_5_years_validity: 26000,
    international_1_year: 18000
}
const other_vehicle_permits = {
    riders_card: 7500,
    federal_mid_year_truck_permit: 3500,
    reprint_police_cmr: 4000,
    light_duty_permit: 5000,
    change_of_vehicle_engine: 10500,
    heavy_and_light_duty_permit: 4000,
    auto_reg_database: 9500,
    reprint_regular_number_plate: 33000,
    reprint_customized_number_plate: 80000
}
let total_price = 0


const mountTotal = (total) => {
    let x = document.querySelector('input[type=submit]')
    x.value = `Start Processing(₦${total})`
    let y = document.getElementById('amount')
    y.value = total
}


// NEW VEHICLE PAPERS
let x1 = 0
let x2 = 0
const newPapers = (v1, v2) =>  {
    if (v1) x1 = v1
    if (v2) x2 = v2
    total_price = new_papers[v1 || x1][v2 || x2]
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