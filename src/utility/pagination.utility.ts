// export const paginate = async (model, page = 1, limit = 10, query = {}, sort = {}) => {
//     const skip = (page - 1) * limit;
//     const countPromise = model.countDocuments(query).exec();
//     const findPromise = model.find(query).sort(sort).skip(skip).limit(limit).exec();

//     const [total, results] = await Promise.all([countPromise, findPromise]);

//     return {
//         data: results,
//         meta: {
//             total,
//             page,
//             pageSize: limit,
//             last_page: Math.ceil(total / limit),
//         }

//     };
// };

// Alt 1
// ? https://www.phind.com/search?cache=qqbtsqxquzj9rjsm66efxbia
import { Model } from "mongoose";

export const paginate = async <T extends Document>(model: Model<T>, page = 1, limit = 10, query = {}, sort = {}) => {
    const skip = (page - 1) * limit;
    const countPromise = model.countDocuments(query).exec();
    const findPromise = model.find(query).sort(sort).skip(skip).limit(limit).exec();

    const [total, results] = await Promise.all([countPromise, findPromise]);

    return {
        data: results,
        meta: {
            total,
            page,
            pageSize: limit,
            last_page: Math.ceil(total / limit),
        }

    };
};





