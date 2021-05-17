import React, {useEffect, useState} from 'react'
import { useCookies } from 'react-cookie'

import styles from './AgeGate.css'

const AgeGate = () => {

	const dayInput: any = React.createRef();
	const mounthInput: any = React.createRef();
	const yearInput: any = React.createRef();
	const rememberMeCheckbox: any = React.createRef();
	const [cookies, setCookie] = useCookies(['BEageGate'])
	const [day, setDay] = useState(`0`)
	const [mounth, setMounth] = useState(`0`)
	const [year, setYear] = useState(`0`)
	const [isRemember, setRemember] = useState(false)
	const [isAccess, setAccess] = useState(true)
	const [langueage, setLanguage] = useState('')

	useEffect(() => {
		const lang =window.location.href
		//const path =lang.substr(-3,2)
		const path =lang.substr(-3,2)
		if(path === 'en' || path === 'fr' || path === 'nl'){
			setLanguage(path)
		} else {
			setLanguage('en')
		}

	}, [])

	const handleClick = () => {
		if(isRemember) {
			let expiresDate = new Date()
			expiresDate.setDate(expiresDate.getDate() + 60)
			setCookie('BEageGate', true, {expires: expiresDate})
		} else {
			setCookie('BEageGate', true)
		}
	}

	const onClickConfirm = () => {
		const msIn18Years = 568025136000
		const nowDate = Date.now()
		const currentMounth = Number(mounth)<10? `0${Number(mounth)}`: Number(mounth)
		const currentDay = Number(day)<10? `0${Number(day)}`: Number(day)
		const dateString = `${Number(year)}-${currentMounth}-${currentDay}T24:00:00`
 		const inputDateInMs = Date.parse(dateString)
		const ageInMs = nowDate - inputDateInMs
console.log(ageInMs)
		if(ageInMs < msIn18Years) {
			console.log('no')
			setAccess(false)

		} else if(ageInMs >= msIn18Years){
			console.log('yes')
			handleClick()
		}
	}
	useEffect(() => {
		if (!cookies.BEageGate) {
			setCookie('BEageGate', false)
		}

	}, [])

	const changeDay =(e: any)=>{
		let day = e.target.value
		if(day.length > 1){
			if(day < 1){
				day = 1
			}
			else if(day > 31){
				day = 31
			}
			dayInput.current.value = day
			setDay(day)
			mounthInput.current.focus()
		}
	}
	const changeMounth =(e: any)=>{
		let mounth = e.target.value

		if(mounth.length > 1){
			if(mounth < 1){
				mounth = 1
			}
			else if(mounth > 12){
				mounth = 12
			}
			mounthInput.current.value = mounth
			setMounth(mounth)

			yearInput.current.focus()
		}
	}
	const changeYear =(e: any)=>{
		let year = e.target.value


		if(year.length > 3){
			if(year < 1900){
			year = 1900
		}
		else if(year > 2020){
			year = 2020
		}
			yearInput.current.value = year
			setYear(year)
			rememberMeCheckbox.current.focus()
		}
	}
	return (
		<div>
			{cookies.BEageGate == 'false' && langueage !== '' &&(
 				<div className={styles.ageGateWrapper}>
					<div className={styles.ageGateContainer}>
						<div className={`${styles.ageGateLogoContainer} flex`}>
								<img className={styles.logoImage} src="https://abibewebshop.vtexassets.com/assets/vtex.file-manager-graphql/images/b51b748e-9c50-4248-9b51-68846a2d8359___014546075148f2f1404a41002ba78895.png"></img>
						</div>
						{isAccess ? <div className={styles.ageGateUnderAge}>
							<p className={styles.logoText}>{langueage === 'en' ? `Are you over Legal Drinking Age?` : langueage === 'fr' ? `ÊTES-VOUS EN ÂGE LÉGAL DE BOIRE DE L'ALCOOL ?` : `Bent u ouder dan de wettelijke drinkleeftijd?`}</p>
								<p  className={styles.ageQuestion}>{langueage === 'en' ? `Please enter your date of birth` : langueage === 'fr' ? 'Veuillez entrer votre date de naissance' : 'Bent u 18 jaar of ouder ?'}</p>
							<div className={styles.inputContainer}>
							<input ref={dayInput} className={styles.dataInput} onChange={e =>  changeDay(e)} autoFocus  type="text" name="agegate-d" maxLength={2} placeholder={langueage === 'fr'? 'jj' : 'dd'} tabIndex={0}></input>
							<input ref={mounthInput} className={styles.dataInput} onChange={e => changeMounth(e)} type="text" name="agegate-m" maxLength={2} placeholder="mm" tabIndex={0}></input>
							<input ref={yearInput} className={styles.dataInput} onChange={e => changeYear(e)}type="text" name="agegate-y" maxLength={4} placeholder={langueage === 'fr'? 'aaaa' : langueage === 'nl'? 'jjjj' : 'yyyy'} tabIndex={0}></input>
						</div>
							<input className={styles.checkboxRemember} id="remember" type="checkbox" onChange={()=> setRemember(!isRemember)}></input>
							<label htmlFor={'remember'} className={styles.ageLable}>{langueage === 'en' ? `Remember me` : langueage === 'fr' ? 'Se souvenir de moi' : 'Onthoud mij'}</label>

							 <button ref={rememberMeCheckbox} className={styles.ageGateButton} onClick={onClickConfirm}>
								{langueage === 'en' ? `CONTINUE` : langueage === 'fr' ? 'CONTINUER' : 'DOORGAAN'}
						</button>
						</div> : <div><p className={styles.unswer}>{langueage === 'en' ? `Sorry, you must be 18 years or older to visit this website` : langueage === 'fr' ? 'Désolé, vous devez être âgé d`au moins 18 ans pour visiter ce site Web' : 'Sorry, je moet 18 jaar of ouder zijn om deze website te bezoeken'}</p></div>}
						<div className={styles.textContainer}>
							<p className={styles.descriptionBottomText}>{langueage === 'en' ? `Our craftmanship is enjoyed responsibly.` : langueage === 'fr' ? 'Notre savoir-faire se déguste avec sagesse.' : 'Ons vakmanschap drink je met verstand.'}</p>
							<p className={styles.descriptionBottomText}>{langueage === 'en' ? `Don't share this site with people under drinking age.` : langueage === 'fr' ? 'Ne partagez pas ce site avec des mineurs.' : 'Deel de inhoud van deze site niet met minderjarigen.'}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	)

}

AgeGate.schema = {
	title: 'AgeGate',
	description: 'Age Gate',
	type: 'object',
}

export default AgeGate
