import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, CircularProgress } from '@mui/material';

export default function Student() {
    const paperStyle = {padding: '50px 20px', width:600,margin:"20px auto"}
    const [name, setName] =useState('')
    const [address, setAddress]=useState('')
    const [students, setStudents]=useState([])
    const [loading, setLoading] = useState(false); // Stare pentru încărcare

  const handleClick =(e) => {
    e.preventDefault()
    const student={name,address}
    setLoading(true); // Activează starea de încărcare

    fetch("http://localhost:8080/student/add", {
    method:"POST" ,
    headers: {"Content-Type":"application/json"}, 
    body: JSON.stringify(student)

  }).then(() => {
    console.log("New Student added!!!!");
    setTimeout(() => {
    setLoading(false); // Dezactivează starea de încărcare
    // Reîncărcați lista de studenți
    fetchStudents();
  },1000);
  });
}
  
  const fetchStudents = () => {
    fetch("http://localhost:8080/student/getAll")
    .then(res=>res.json())
    .then((result)=>{
      setStudents(result);
    });
  }

  useEffect(()=>{
    fetchStudents(); // Apelați funcția fetchStudents pentru a încărca studenții inițiali
  },[])

  return (
    <Container>
        <Paper elevation={3} style = {paperStyle}>
            <h1 style ={{color:"blue"}}> <u>Add Student</u></h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
      value={name} 
      onChange={(e)=>setName(e.target.value)} />
      <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth
      value={address}
      onChange={(e)=>setAddress(e.target.value)} 
      />
<Button style = {{backgroundColor:"blue", color:"white"}} variant="contained" color="success" onClick={handleClick} disabled={loading}>
  {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
</Button>
    </Box>
   
    </Paper>
    <h1>Students</h1>
    
      <Paper elevation={3} style={paperStyle}>
        {students.map(student=>(
          <Paper elevation={6} style ={{margin:"10px", padding:"15px", textAlign:"left"}} key={student.id}>
          Id:{student.id}<br/>
          Name:{student.name}<br/>
          Address:{student.address}
          </Paper>
        ))}
    </Paper>
    </Container>
  );
}
