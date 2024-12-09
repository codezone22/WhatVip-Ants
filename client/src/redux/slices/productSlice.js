import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUpdateProduct: {
        _id: '',
        productName: '',
        productType: '',
        productCategory: '',
        importPrice: '',
        exportPrice: '',
        discountPerc: '',
        quantity: 0,
        quantitySold: 0,
        description: '',
        status: 'Chưa đăng bán',
        colors: [],

    },
    listProducts: [],
    listProductsState: [],
    listCategories: [],
}

const slice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        resetCurrentProduct: (state) => {
            state.currentUpdateProduct = {
                ...state.currentUpdateProduct,
                productName: '',
                productType: '',
                productCategory: '',
                importPrice: '',
                exportPrice: '',
                discountPerc: '',
                quantity: 0,
                quantitySold: 0,
                description: '',
                status: 'Chưa đăng bán',
                colors: [],
            }
        },
        setCurrentProduct: (state, action) => {
            state.currentUpdateProduct = {
                ...state.currentUpdateProduct,
                ...action.payload
            }
        },
        handleChangeInputText: (state, action) => {
            state.currentUpdateProduct = {
                ...state.currentUpdateProduct,
                [action.payload.name]: action.payload.value
            }
        },
        handleAddNewColor: (state) => {
            state.currentUpdateProduct = {
                ...state.currentUpdateProduct,
                colors: [...state.currentUpdateProduct.colors, {
                    colorName: '',
                    colorCode: '#000000',
                    images: [],
                    sizes: [],
                    changeImage: false,
                }]
            }
        },
        handleRemoveColor: (state,action) => {
            state.currentUpdateProduct = {
                ...state.currentUpdateProduct,
                colors: [...state.currentUpdateProduct.colors].filter((item, index) => index !== action.payload.index)
            }
        },
        handleChangeColorName: (state,action) => {
            state.currentUpdateProduct = {
                ...state.currentUpdateProduct,
                colors: [...state.currentUpdateProduct.colors].map((item, index) => {
                    if (index === action.payload.index) {
                        return { ...item, colorName: action.payload.colorName }
                    }
                    else return item;
                })
            }
        },
        handleChangeColorCode: (state,action) => {
            state.currentUpdateProduct = {
                ...state.currentUpdateProduct,
                colors: [...state.currentUpdateProduct.colors].map((item, index) => {
                    if (index === action.payload.index) {
                        return { ...item, colorCode: action.payload.colorCode }
                    }
                    else return item;
                })
            }
        },
        handleColorAddImage: (state,action) => {
            state.currentUpdateProduct = {
                ...state.currentUpdateProduct,
                colors: [...state.currentUpdateProduct.colors].map((item, index) => {
                    if (index === action.payload.index) {
                        return {
                            ...item,
                            images: [...item.images, '']

                        }
                    }
                    else return item;
                })
            }
        },
        handleColorChangeImage: (state,action) => {
            state.currentUpdateProduct = {
                ...state.currentUpdateProduct,
                colors: [...state.currentUpdateProduct.colors].map((item, index) => {
                    if (index === action.payload.indexColor) {
                        return {
                            ...item,
                            images: [...item.images].map((item, indexImage) => {
                                if (indexImage === action.payload.indexImage) {
                                    return action.payload.base64
                                }
                                else return item;
                            }),
                            changeImage: true
                        }
                    }
                    else return item;
                }),
            }
        },
        handleColorRemoveImage: (state,action) => {
            state.currentUpdateProduct = {
                ...state.currentUpdateProduct,
                colors: [...state.currentUpdateProduct.colors].map((item, index) => {
                    if (index === action.payload.indexColor) {
                        return {
                            ...item,
                            images: [...item.images].filter((item, index2) => index2 !== action.payload.indexImage),
                            changeImage: true
                        }
                    }
                    else return item;
                })
            }
        },
        handleColorAddSize: (state,action) => {
            state.currentUpdateProduct = {
                ...state.currentUpdateProduct,
                colors: [...state.currentUpdateProduct.colors].map((item, index) => {
                    if (index === action.payload.index) {
                        return {
                            ...item,
                            sizes: [...item.sizes, {
                                sizeName: '',
                                quantity: 0
                            }]
                        }
                    }
                    else return item;
                })
            }
        },
        handleColorChangeSizeName: (state,action) => {
            state.currentUpdateProduct = {
                ...state.currentUpdateProduct,
                colors: [...state.currentUpdateProduct.colors].map((item, index) => {
                    if (index === action.payload.indexColor) {
                        return {
                            ...item,
                            sizes: [...item.sizes].map((item, index) => {
                                if (index === action.payload.indexSize) {
                                    return {
                                        ...item,
                                        sizeName: action.payload.sizeName
                                    }
                                }
                                else return item;
                            })
                        }
                    }
                    else return item;
                })
            }
        },
        handleColorRemoveSize: (state,action) => {
            state.currentUpdateProduct = {
                ...state.currentUpdateProduct,
                colors: [...state.currentUpdateProduct.colors].map((item, index) => {
                    if (index === action.payload.indexColor) {
                        return {
                            ...item,
                            sizes: [...item.sizes].filter((item, index2) => index2 !== action.payload.indexSize)
                        }
                    }
                    else return item;
                })
            }
        },
        setListProducts: (state,action) => {
            state.listProducts =  [...action.payload]
        },
        setListProductsState: (state,action) => {
            state.listProductsState = [...action.payload]
        },
        filterListProductsState: (state,action) => {
            let tmp = [...state.listProducts]
            if (action.payload.filter.searchText !== '') tmp = tmp.filter(item => item.productName.includes(action.payload.filter.searchText) || item.productCode.includes(action.payload.filter.searchText));
            if (action.payload.filter.productCategory !== '' && action.payload.filter.productCategory !== 'Tất cả') tmp = tmp.filter(item => item.productCategory === action.payload.filter.productCategory);
            if (action.payload.filter.productType !== '' && action.payload.filter.productType !== 'Tất cả') tmp = tmp.filter(item => item.productType === action.payload.filter.productType);
            if (action.payload.filter.status !== '' && action.payload.filter.status !== 'Tất cả') tmp = tmp.filter(item => item.status === action.payload.filter.status);
            state.listProductsState =  [...tmp]
        },
        setListProductCategories: (state,action) => {
           
            state.listCategories =  [...action.payload]
        },
    }

})

export default slice.reducer;
export const {
    resetCurrentProduct,
    setCurrentProduct,
    handleChangeInputText,
    handleAddNewColor,
    handleRemoveColor,
    handleChangeColorName,
    handleChangeColorCode,
    handleColorAddImage,
    handleColorChangeImage,
    handleColorRemoveImage,
    handleColorAddSize,
    handleColorChangeSizeName,
    handleColorRemoveSize,
    setListProducts,
    setListProductsState,
    filterListProductsState,
    setListProductCategories
} = slice.actions