const person = {
    name : 'Narendra VIdda',
    age: 28,
    salary : 150000,
    address : {
        basic : {
            vpo: 'Singhada',
            city : 'bayana',
            district : 'Bharatpur'
        },
        state : 'Rajasthan',
        country : 'India'
    }
}

const updatePerson = {
    ...person,
    age : 29,
    address : {
        ...person.address,
        basic : {
            ...person.address.basic,
            city : 'Jaipur',
            vpo : 'Mansarovar'
        }
    }
}

console.log("updatePerson : ", updatePerson)