import bcrypt from "bcrypt"


export const compareHashedData = ({data, hashedData})=>{
    return bcrypt.compareSync(data, hashedData)
}