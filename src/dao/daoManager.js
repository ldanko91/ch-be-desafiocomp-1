const selectDB = process.env.SELECTDB

export const getManagerMssg = async()=> {
    const modelMssg = selectDB === 1 ? await import('./MongoDB/models/Message.js') : await import('./MongoDB/models/Message.js')
    return modelMssg
}

export const getManagerProd = async()=> {
    const modelProd = selectDB === 1 ? await import('./MongoDB/models/Product.js') : await import('./MongoDB/models/Product.js')
    return modelProd
}

export const getManagerCart = async()=> {
    const modelCart = selectDB === 1 ? await import('./MongoDB/models/Cart.js') : await import('./MongoDB/models/Cart.js')
    return modelCart
}