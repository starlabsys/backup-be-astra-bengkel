export const timeOut = 50000

export const baseUrl = () : string => {
    if ( process.env.ENV === 'prod' ) {
        return process.env.BASE_URL_PROD as string
    }
    return process.env.BASE_URL_DEV as string
}


export const header = async () => {
    const token = "";
    return {
        "Content-Type" : "application/json",
        "Accept" : "application/json, text/plain, */*",
        "Origin" : "https://psshsoapi.astra.co.id",
        'Authorization' : `Bearer c6eviV-eHXBbXnAOAdazQqlRESG9D-QdL-fAeB1Cg6dQ5UlsPS1povg6bEOOhre_R3LuOVCMXKQt4zqMEe4isChak8agxxxD-NAf1V4MM4fQ5kbrtv1OCELOb1XaYPzqkstowrvD59VdwvnMvsIKV8iOBScKzXYnAhErNu0Omg4jQ3yVIxLgS6f0CtM6TLxzDgcFd19fkHixUbOLjEqrXeYxlGJO6qv920-OkJ2QAkUztn0WxvsmarjgUivdbh3SjV0KFqmDlTQl6OA_sxkGRGftc9KNsE9wGBP-lkS1wzcv6sMrkMhrO-nKjrLa0DUmgtJGtLHiS6cuvypovnI4CxdVPVq41yId7e_Tb5tstUjqGp41P9yd3u59ShkzHfvDaDRjXmMr43Yb_vpHr5Gtuc2vq4ELTaZ8r4x8vI7aqmL1RxxH`
    }
}
