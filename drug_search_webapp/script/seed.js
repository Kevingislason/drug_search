'use strict'

const db = require('../server/db')
const {
  User,
  Drug,
  DrugName,
  Mechanism,
  DrugMechanism
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const drug2Data = {
    condition: 'Depression',
    highestPhase: 'Launched',
    conditionInActiveDevelopment: false,
    year: 2000,
    organization: {id: 1, name: 'Lab 22'},
    administrationRoutes: [{id: 1, route: 'oral'}]
  }

  const drugs = await Promise.all([
    Drug.create({id: 1, developmentStatus: []}),
    Drug.create({id: 2, developmentStatus: [drug2Data]})
  ])

  const drugNames = await Promise.all([
    DrugName.create({drugId: 1, name: 'hydrobutlyamide', nameType: 'Generic'}),
    DrugName.create({drugId: 2, name: 'happium', nameType: 'Brand'}),
    DrugName.create({
      drugId: 2,
      name: 'hydromethlyisocyanate',
      nameType: 'Generic'
    })
  ])

  const mechanisms = await Promise.all([
    Mechanism.create({id: 1, name: 'DNA Topoisomerase II alpha Inhibitors'}),
    Mechanism.create({id: 2, name: 'hEP II Inhibitors'})
  ])

  const drugMechs = await Promise.all([
    DrugMechanism.create({mechanismId: 1, drugId: 1}),
    DrugMechanism.create({drugId: 2, mechanismId: 1}),
    DrugMechanism.create({drugId: 2, mechanismId: 2})
  ])

  //const drugMechanisms = await Promise.all([])
  console.log(`seeded ${drugs.length} drugs`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
