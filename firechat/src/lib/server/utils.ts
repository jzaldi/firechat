export const getUserID = async (locals: App.Locals): Promise<string> => {

    const session = await locals.auth(); 

    if (session?.user?.email){
        return session.user.email
    } else {
        throw new Error("User not authenticated")
    }

}

export const getUser = async (locals: App.Locals) => {
    const session = await locals.auth(); 

    if (session?.user){
        return session.user
    } else {
        throw new Error("User not authenticated")
    }

}