import mongoose from 'mongoose'

const formSchema = mongoose.Schema({
    
    title: String,

    description: String,

    questions: [{
        question: String,

        type: Number,

        required: Boolean,

        protected: Boolean,

        specifics: Object  
    }]
    
}, { timestamps: true })

const FormModel = mongoose.model('FormModel', formSchema , 'Formulaires' )

export default FormModel


// question types objects

// type 1 - short answer questions
const one = null

// type 2 - long answer questions (paragraphs)
const two = null

// type 3 - multiple choice questions
const three = {
    other: Boolean,

    choices: [String]
}

// type 4 - multiple short answers questions (lists)
const four = {
    min: { type: Number, default: null },

    max: { type: Number, default: null }
}

// type 5 - number (quantity) questions
const five = {
    min: { type: Number, default: null },

    max: { type: Number, default: null }
}

// type 6 - date & time
const six = {
    date: Boolean,

    time: Boolean
}