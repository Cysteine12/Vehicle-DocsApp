// Order of object is: salon_mini:1 salon_maxi:2 suv_jeep:3 coaster_bus:4 truck:5
// Order of array is: 
// private_3rd_party_insurance | commercial_3rd_party_insurance | customized_3rd_party_insurance
const new_papers = {
    1: [ 62000, 66000, 300000 ],
    2: [ 63000, 67000, 310000 ],
    3: [ 65000, 70000, 310000 ],
    4: [ null, 80000, null],
    5: [ null, 84000, null]
}


// order of array is: salon_mini:1 salon_maxi:2 suv_jeep:3 coaster_bus:4 truck:5
const renew_papers = {
    vehicle_license: [ 2500, 3000, 4000, 4000, 6000 ],
    road_worthiness_private: [ 4500, 5000, 6000, 6500, null ],
    road_worthiness_commercial: [ 4000, 4500, 5500, 6000, 8000 ],
    third_party_insurance_private: [ 15000, 15000, 15000, 15000, null ],
    third_party_insurance_commercial: [ 20000, 20000, 20000, 20000, 100000 ],
    hackney_permit: [ 2300, 2500, 3000, 4000, null ],
    heavy_duty_permit: [ null, null, null, null, 5000 ],
    local_government_permit: [ 15000, 15000, 15000, 15000, 20000 ],
    truck_trailer_permit: [ null, null, null, null, 5000 ]
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
let x3 = null
let x4 = null

// ============================================================================//

const mountTotal = (total) => {
    let x = document.querySelector('input[type=submit]')
    x.value = `Start Processing(₦${total})`
    let y = document.getElementById('amount')
    y.value = total
}


// NEW VEHICLE PAPERS

const newPapers = (v1, v2) =>  {
    if (v1 == 4 || v1 == 5) {
        document.getElementById('regType').selectedIndex = 0
        document.querySelectorAll('.regType').forEach(opt => { opt.disabled = true })
    } else {
        document.querySelectorAll('.regType').forEach(opt => { opt.disabled = false })
    }

    if (v1) x1 = v1
    if (v2) x2 = v2
    total_price = new_papers[x1 || v1][x2 || v2]
    mountTotal(total_price)
}

// RENEW VEHICLE PAPERS

const renewPapers = (e, v1, v2, v3, v4) => {
    if (v1 !== null) {
        x1 = v1
        document.querySelectorAll(['input[type=checkbox]', 'input[type=radio]']).forEach(box => {
            box.disabled = false 
            box.checked = false
        })
        total_price = 0
        x3 = 0
        x4 = 0
        mountTotal(total_price)
    } 
    else {
        const priceObtained = (a, b) => {
            let price = renew_papers[a][b]
            if (price === null) {
                if (e.target.type === 'radio') {
                    document.getElementsByClassName(e.target.class).disabled = true
                    document.getElementsByClassName(e.target.class).checked = false
                } else {
                    document.getElementsByName(e.target.name).forEach(box => {
                        box.disabled = true
                        box.checked = false
                    })
                }
            }
            return price
        }
        if (e.target.type === 'radio') {
            if (v3) {
                if (x3) {
                    total_price -= priceObtained(x3, x1)
                    total_price += priceObtained(v3, x1)
                } else {
                    total_price += priceObtained(v3, x1)
                }
                x3 = v3
            } else if (v4) {
                if (x4) {
                    total_price -= priceObtained(x4, x1)
                    total_price += priceObtained(v4, x1)
                } else {
                    total_price += priceObtained(v4, x1)
                }
                x4 = v4
            }
        } else if (e.target.checked === true) {
            total_price += priceObtained(v2, x1)
        } else if (e.target.checked === false) {
            total_price -= priceObtained(v2, x1)
        }
        
        mountTotal(total_price)
    }

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