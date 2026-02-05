import { useState } from 'react'
import {
  Container,
  Paper,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Button,
  Box,
  Alert,
  Grid
} from '@mui/material'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    agreeTerms: false,
    newsletter: false,
    gender: '',
    comments: ''
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters'
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }

    // Age validation
    if (!formData.age.trim()) {
      newErrors.age = 'Age is required'
    } else if (isNaN(formData.age) || formData.age < 18 || formData.age > 120) {
      newErrors.age = 'Age must be between 18 and 120'
    }

    // Terms validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions'
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender'
    }

    return newErrors
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true)
      setErrors({})
      console.log('Form submitted:', formData)
    } else {
      setErrors(newErrors)
      setSubmitted(false)
    }
  }

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: '',
      agreeTerms: false,
      newsletter: false,
      gender: '',
      comments: ''
    })
    setErrors({})
    setSubmitted(false)
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
          User Registration Form
        </Typography>
        
        <Typography variant="body1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
          Please fill out the form below with your information
        </Typography>

        {submitted && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Form submitted successfully! Thank you for your registration.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            {/* First Name and Last Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                margin="normal"
              />
            </Grid>

            {/* Email and Phone */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="phone"
                name="phone"
                label="Phone Number"
                placeholder="1234567890"
                value={formData.phone}
                onChange={handleInputChange}
                error={!!errors.phone}
                helperText={errors.phone}
                margin="normal"
              />
            </Grid>

            {/* Age */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="age"
                name="age"
                label="Age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
                error={!!errors.age}
                helperText={errors.age}
                margin="normal"
                inputProps={{ min: 18, max: 120 }}
              />
            </Grid>

            {/* Gender Radio Buttons */}
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset" margin="normal" error={!!errors.gender}>
                <FormLabel component="legend">Gender *</FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
                {errors.gender && (
                  <Typography variant="caption" color="error">
                    {errors.gender}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {/* Comments */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="comments"
                name="comments"
                label="Additional Comments"
                multiline
                rows={4}
                value={formData.comments}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>

            {/* Checkboxes */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      color="primary"
                    />
                  }
                  label="I agree to the terms and conditions *"
                />
                {errors.agreeTerms && (
                  <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                    {errors.agreeTerms}
                  </Typography>
                )}
                
                <FormControlLabel
                  control={
                    <Checkbox
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleInputChange}
                      color="primary"
                    />
                  }
                  label="Subscribe to newsletter for updates"
                />
              </Box>
            </Grid>

            {/* Submit Buttons */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ minWidth: 120 }}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  size="large"
                  onClick={handleReset}
                  sx={{ minWidth: 120 }}
                >
                  Reset
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  )
}

export default App
