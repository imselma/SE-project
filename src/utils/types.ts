
export type Recipe = {
    id: string,
    name: string,
    description: string,
    steps: string,
    ingredients: string[],
    cookingTime: number,
    restriction: string,
    user: {
        id: string,
        name: string,
        surname: string
    } 

}


export type Recipe2 = {
    name: string,
    description: string,
    steps: string,
    ingredients: string[],
    cookingTime: number,
    restriction: string,
    userId: string

}


export type Ingredient = {
    name: string,
    category: string,
    measurementUnit: string
}

export type User = {
        email: string,
        password: string,
        username: string,
        name: string,
        surname: string,
        userType: "MEMBER"
}