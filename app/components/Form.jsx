import React from 'react'

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            phoneNumber: '',
            formErrors: {
                phoneNumber: '',
            },
            valid: false
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    isValidPhone(text) {
        let phonePattern = /^0\d{9}$/
        let checkPhone = phonePattern.exec(text)

        if (checkPhone !== null) {
            return true
        } 

        return false
    }

    isValidEmail(text) {
        let mailPattern =/^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/
        let checkMail = mailPattern.exec(text)

        if (checkMail !== null) {
            return true
        } 

        return false
    }

    handleInputChange(event) {
        let target = event.target
        let tname = target.name
        let value = target.value

        if(tname === 'phoneNumber') {
            if (!this.isValidPhone(value)) {
                this.setState({
                    formErrors: {
                        phoneNumber: 'Số điện thoại cần được nhập đúng định dạng',
                    }
                })
            } else {
                this.setState({
                    formErrors: {
                        phoneNumber: '',
                    }
                })
            }
        } 

        if(tname === 'email') {
            if (!this.isValidEmail(value)) {
                this.setState({
                    formErrors: {
                        email: 'Email cần được nhập đúng định dạng',
                    }
                })
            } else {
                this.setState({
                    formErrors: {
                        email: '',
                    }
                })
            }
        } 
    
        this.setState({
          [tname]: value
        })
      }

    handleSubmit(event) {
        event.preventDefault()
        let { name, email, phoneNumber, formErrors } = this.state
        if (name && email && phoneNumber && !formErrors.email && !formErrors.phoneNumber) {
            fetch('/user/', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    name,
                    email,
                    phoneNumber
                })
            }).then(() => {
                this.props.handleSubmit()
            })
        } else {
            return
        }  
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                    <div className="col-12">
                        <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Name"/>
                    </div>
                    <div className="col-12">
                        <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} placeholder="Email"/>
                    </div>
                    <div className="col-12">
                        <input type="text" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInputChange} placeholder="Phone Number"/>
                    </div>
                    <div className="col-12">
                        <FormErrors formErrors={this.state.formErrors} />
                    </div>
                    <button className="btnConfirm btn btn-info btn-lg"  type="submit" value="Submit">Bắt đầu</button>
                </div>
                
            </form>
        )
    }
}

const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>{formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>

export default Form