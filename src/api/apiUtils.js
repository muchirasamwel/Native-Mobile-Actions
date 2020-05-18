export async function handleResponse(response) {
    if(response.status===200)
        return response.data;
    else
        console.log("Unexpected error occurred");
}
export function handleError(error) {
    console.log('API Error '+error);
    return error;
}
