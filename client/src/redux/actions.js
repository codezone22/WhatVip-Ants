export const increaseQuantityItem = (data) => {
    return {
        type: 'cart/increaseQuantity',
        payload: data
    }
}

export const reduceQuantityItem = (data) => {
    return {
        type: 'cart/reduceQuantity',
        payload: data
    }
}

export const deleteOrderItem = (data) => {
    return {
        type: 'cart/deleteOrderItem',
        payload: data
    }
}

export const filterChange = (data) => {
    return {
        type: 'cart/filterChange',
        payload: data
    }
}

export const importItemToOrder = (data) => {
    return {
        type: 'cart/importItemToOrder',
        payload: data
    }
}