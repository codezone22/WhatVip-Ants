import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    discount: '',
    totalMoneyGoods: 0,
    finalMoney: '',
    listImportProducts: [],
}

const getTotalMoney = (listImportProducts) => {
    const res = listImportProducts.reduce((acc,cur) => {

        const resCur = cur.colors.reduce((acc2,cur2) => {
            const resCur2 = cur2.sizes.reduce((acc3,cur3) => {
                return acc3 + Number(cur3.quantity)*Number(cur.unitPriceImport);
            },0)
            return acc2 + resCur2
        },0)
        return acc + resCur;
    },0)
    return res
}

const slice = createSlice({
    name: 'importProducts',
    initialState,
    reducers: {
        setListImportProducts: (state, action) => {
            state.listImportProducts = [{
                productCode: action.payload.productCode,
                productName: action.payload.productName,
                productType: action.payload.productType,
                unitPriceImport: '',
                quantity: 0,
                colors: [{
                    colorName: '',
                    sizes: [{
                        sizeName: '',
                        quantity: '',
                    }],
                    showMore: true
                }],
                originColors: action.payload.colors,
                dropdownListColors: action.payload.colors.map(item => item.colorName),
                dropdownListSizes: [] 
            }]
            let tmp = getTotalMoney(state.listImportProducts);
            state.totalMoneyGoods = tmp;
            state.finalMoney = state.totalMoneyGoods - state.discount
        },
        addIntoListImportProducts: (state, action) => {
            for (let i = 0; i < state.listImportProducts.length; i++) {
                if (state.listImportProducts[i].productCode === action.payload.productCode) return;
            }
            state.listImportProducts = [...state.listImportProducts, {
                productCode: action.payload.productCode,
                productName: action.payload.productName,
                productType: action.payload.productType,
                unitPriceImport: '',
                quantity: 0,
                colors: [{
                    colorName: '',
                    sizes: [{
                        sizeName: '',
                        quantity: '',
                    }],
                    showMore: true
                }],
                originColors: action.payload.colors,
                dropdownListColors: action.payload.colors.map(item => item.colorName),
                dropdownListSizes: [] 

            }]
            let tmp = getTotalMoney(state.listImportProducts);
            state.totalMoneyGoods = tmp;
            state.finalMoney = state.totalMoneyGoods - state.discount
        },
        removeItemImport: (state, action) => {
            state.listImportProducts = [...state.listImportProducts].filter((item, index) => {
                return index !== action.payload.index
            })
            let tmp = getTotalMoney(state.listImportProducts);
            state.totalMoneyGoods = tmp;
            state.finalMoney = state.totalMoneyGoods - state.discount
        },
        handleChangeUnitPriceImport: (state, action) => {
            state.listImportProducts = [...state.listImportProducts].map((item, index) => {
                if (index === action.payload.index) {
                    return {
                        ...item,
                        unitPriceImport: (action.payload.unitPriceImport)
                    }
                }
                else return item;
            })
            let tmp = getTotalMoney(state.listImportProducts);
            state.totalMoneyGoods = tmp;
            state.finalMoney = state.totalMoneyGoods - state.discount
        },
        handleAddColor: (state, action) => {
            state.listImportProducts = [...state.listImportProducts].map((item, index) => {
                if (index === action.payload.index) {
                    if (item.colors.length === item.originColors.length) return item;
                    return {
                        ...item,
                        colors: [...item.colors, {
                            colorName: '',
                            sizes: [{
                                sizeName: '',
                                quantity: '',
                            }]
                        }]
                    }
                }
                else return item;
            })
            let tmp = getTotalMoney(state.listImportProducts);
            state.totalMoneyGoods = tmp;
            state.finalMoney = state.totalMoneyGoods - state.discount
        },
        handleRemoveColor: (state, action) => {
            state.listImportProducts = [...state.listImportProducts].map((item, index) => {
                if (index === action.payload.index) {
                    return {
                        ...item,
                        colors: [...item.colors].filter((item2, index2) => {
                            return index2 !== action.payload.indexColor
                        })
                    }
                }
                else return item;
            })
            let tmp = getTotalMoney(state.listImportProducts);
            state.totalMoneyGoods = tmp;
            state.finalMoney = state.totalMoneyGoods - state.discount
        },
        handleAddSize: (state, action) => {
            state.listImportProducts = [...state.listImportProducts].map((item, index) => {
                if (index === action.payload.index) {
                    return {
                        ...item,
                        colors: [...item.colors].map((item2, index2) => {
                            if (index2 === action.payload.indexColor) {
                                const originSizes = item.originColors.find(x => x.colorName === item2.colorName).sizes;
                                if (item2.sizes.length === originSizes.length) return item2;
                                return {
                                    ...item2,
                                    sizes: [...item2.sizes, {
                                        sizeName: '',
                                        quantity: '',
                                    }]
                                }
                            }
                            else return item2
                        })
                    }
                }
                else return item;
            })
            let tmp = getTotalMoney(state.listImportProducts);
            state.totalMoneyGoods = tmp;
            state.finalMoney = state.totalMoneyGoods - state.discount
        },
        handleRemoveSize: (state, action) => {
            state.listImportProducts = [...state.listImportProducts].map((item, index) => {
                if (index === action.payload.index) {
                    return {
                        ...item,
                        colors: [...item.colors].map((item2, index2) => {
                            if (index2 === action.payload.indexColor) {
                                return {
                                    ...item2,
                                    sizes: [...item2.sizes].filter((item3,index3) => {
                                        return index3!==action.payload.indexSize
                                    })
                                }
                            }
                            else return item2
                        })
                    }
                }
                else return item;
            })
            let tmp = getTotalMoney(state.listImportProducts);
            state.totalMoneyGoods = tmp;
            state.finalMoney = state.totalMoneyGoods - state.discount
        },
        handleChangeSizeQuantity: (state, action) => {
            state.listImportProducts = [...state.listImportProducts].map((item, index) => {
                if (index === action.payload.index) {
                    return {
                        ...item,
                        colors: [...item.colors].map((item2, index2) => {
                            if (index2 === action.payload.indexColor) {
                                return {
                                    ...item2,
                                    sizes: [...item2.sizes].map((item3,index3) => {
                                        if (index3===action.payload.indexSize) {
                                            return {
                                                ...item3,
                                                quantity: (action.payload.quantity)
                                            }
                                        }
                                        else return item3
                                    })
                                }
                            }
                            else return item2
                        })
                    }
                }
                else return item;
            })
            let tmp = getTotalMoney(state.listImportProducts);
            state.totalMoneyGoods = tmp;
            state.finalMoney = state.totalMoneyGoods - state.discount
        },
        handleChangeColorName: (state, action) => {
            state.listImportProducts = [...state.listImportProducts].map((item, index) => {
                if (index === action.payload.index) {
                    return {
                        ...item,
                        colors: [...item.colors].map((item2, index2) => {
                            if (index2 === action.payload.indexColor) {
                                const chooseColor = item.colors.filter((itemx,indexx) => indexx!==index2).map(q => q.colorName)
                                if (chooseColor.includes(action.payload.colorName)) return {
                                    ...item2
                                }
                                else return {    
                                    ...item2,
                                    colorName: action.payload.colorName,
                                    dropdownListSizes: action.payload.colorName? item.originColors.find(i => i.colorName === action.payload.colorName).sizes.map(t => t.sizeName) : []
                                }
                                
                            }
                            else return item2
                        })
                    }
                }
                else return item;
            })
            let tmp = getTotalMoney(state.listImportProducts);
            state.totalMoneyGoods = tmp;
            state.finalMoney = state.totalMoneyGoods - state.discount
        },
        handleClickShowMore: (state, action) => {
            state.listImportProducts = [...state.listImportProducts].map((item, index) => {
                if (index === action.payload.index) {
                    return {
                        ...item,
                        colors: [...item.colors].map((item2, index2) => {
                            if (index2 === action.payload.indexColor) {
                                return {
                                    ...item2,
                                    showMore: !item2.showMore
                                }
                            }
                            else return item2
                        })
                    }
                }
                else return item;
            })
        },
        handleChangeSizeName: (state, action) => {
            state.listImportProducts = [...state.listImportProducts].map((item, index) => {
                if (index === action.payload.index) {
                    return {
                        ...item,
                        colors: [...item.colors].map((item2, index2) => {
                            if (index2 === action.payload.indexColor) {
                                return {
                                    ...item2,
                                    sizes: [...item2.sizes].map((item3,index3) => {
                                        if (index3===action.payload.indexSize) {
                                            const chooseSize = item2.sizes.filter((itemx,indexx) => indexx!==index3).map(q => q.sizeName)
                                            if (chooseSize.includes(action.payload.sizeName)) return {
                                                ...item3
                                            }
                                            return {
                                                ...item3,
                                                sizeName: action.payload.sizeName
                                            }
                                        }
                                        else return item3
                                    })
                                }
                            }
                            else return item2
                        })
                    }
                }
                else return item;
            });
        
            let tmp = getTotalMoney(state.listImportProducts);
            state.totalMoneyGoods = tmp;
            state.finalMoney = state.totalMoneyGoods - state.discount
        },
        handleChangeDiscount: (state, action) => {
            state.discount = action.payload.discount
            if (action.payload.discount.trim()!=='' && (/^\d+$/.test(action.payload.discount.trim()))) {
                state.finalMoney = state.totalMoneyGoods - state.discount
                if (state.finalMoney<0) state.finalMoney = 0
            }
           
        },
        handleSetQuantity: (state, action) => {
            state.listImportProducts = [...state.listImportProducts].map((item, index) => {
                if (index === action.payload.index) {
                    return {
                        ...item,
                        quantity: [...item.colors].reduce((acc,cur) => {
                            return acc + cur.sizes.reduce((acc2,cur2) => {
                                return acc2 + Number(cur2.quantity)
                            },0)
                        },0)
                    }
                }
                else return item;
            })
        },
    }

})

export default slice.reducer;
export const {
    setListImportProducts,
    addIntoListImportProducts,
    removeItemImport,
    handleChangeUnitPriceImport,
    handleAddColor,
    handleRemoveColor,
    handleAddSize,
    handleRemoveSize,
    handleChangeSizeQuantity,
    handleChangeColorName,
    handleClickShowMore,
    handleChangeSizeName,
    handleChangeDiscount,
    handleSetQuantity
} = slice.actions