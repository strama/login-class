module.exports = (mongoose) => {
    
    var schema = mongoose.Schema;
    
    var userSchema = new schema({
        email: String,
        name: String, 
        last_name: String,
        password: String
    });

    return mongoose.model('User', userSchema);
}