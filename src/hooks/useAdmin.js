import { useEffect, useState } from "react"

const useAdmin = (email) => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [isAdminLoading, setIsAdminLoading] = useState(true)
    useEffect(() => {
        if (email) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsAdminLoading(false)
                    setIsAdmin(data.isAdmin)
                })
        }
    }, [email])
    return [isAdmin, isAdminLoading]
}

export default useAdmin