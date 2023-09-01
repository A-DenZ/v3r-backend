import mongoose from 'mongoose'

const articleSchema = mongoose.Schema({
    
    title: String,

    description: String,

    link: {
        name:String,
        url:String
    }
    
}, { timestamps: true })

const ArticleModel = mongoose.model('ArticleModel', articleSchema, 'Articles' )

export default ArticleModel