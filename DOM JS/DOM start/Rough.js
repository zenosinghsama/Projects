// console.log('person 1; shows ticket')
// console.log('person 2; shows ticket')

// const preMovie = async () => {
    
// const promiseWifeBringingTicks = new Promise((resolve, reject) => {
//     setTimeout(() => resolve('ticket'), 3000)
// });

//     const getPopcorn = new Promise ((resolve, reject) => resolve(`popcorn`))

//     const getButter = new Promise ((resolve, reject) => resolve (`butter`))

//     const getColdDrinks = new Promise ((resolve, reject) => resolve('colddrink'))

//     let ticket = await promiseWifeBringingTicks;

//     let [popcorn, butter, colddrink] = await Promise.all([getPopcorn, getButter, getColdDrinks]);

//     console.log(`${popcorn}, ${butter}, ${colddrink}`)

//     return ticket;
// }

// preMovie().then((m) => console.log(`person3 : shows ${m}`));

// console.log('person 4; shows ticket')
// console.log('person 5; shows ticket')


const posts = []

function createPost() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push({ title: 'New Post' })
            resolve()
        }, 1000)
    })
}

function updateLastUserActivityTime() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const date = new Date()
            console.log(`Last Activity Time : ${date}`)
            resolve()
        }, 1000)
    })
}

function deletePosts() {
    return new Promise((resolve, reject) => {
        if (posts.length > 0) {
            const popped = posts.pop()
            resolve(popped)
        } else {
            reject('ERROR')
        }
    })
}

async function main() {
    try {
        await createPost('POST 1')
        await updateLastUserActivityTime()
        await createPost('POST 2')
        await updateLastUserActivityTime()
        console.log(posts)
        await deletePosts()
        console.log(posts)
    } catch (err) {
        console.log(err)
    }
}

main()
