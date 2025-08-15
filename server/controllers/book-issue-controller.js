const BookIssued = require('../models/BookIssued');

const addBookIssue = async (req,res) => {
    try{
    const bookIssue = new BookIssued({...req.body, issuedBy: req.user._id});
    await bookIssue.save();
    return res.status(201).send({message: "Book issued successfully", bookIssue});
    }catch(err){
        console.error(err);
        return res.status(500)
        .send({message: err.message});
    }
}

const getBookIssuedByStudent = async (req, res) => {
    const user = req.user;
    let Query;
    if(user.type === 'LIBRARIAN') {
        Query = {issuedTo: req.query.studentId};
    }else{
        Query = {issuedTo: req.user._id};
    }
   
    if(req.query.status) {
        Query = {...Query, status: req.query.status };
    }
    const bookIssuedList = await BookIssued.find(Query);
    console.info(`Found: ${bookIssuedList.length} books issued to student with ID: ${req.query.studentId}`);
    return res.status(201).send(bookIssuedList);
  
}

const geAlltBookIssued = async (req, res) => {
    
    const bookIssuedList = await BookIssued.find({status: req.query.status});
    console.info(`Found: ${bookIssuedList.length} books issued to student.`);
    return res.status(201).send(bookIssuedList);
  
}

module.exports = {
    addBookIssue,   
    getBookIssuedByStudent,
    geAlltBookIssued,
}