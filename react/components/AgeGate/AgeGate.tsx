import React, {useEffect, useState} from 'react'
import { useCookies } from 'react-cookie'

import styles from './AgeGate.css'

const AgeGate = () => {


	const [cookies, setCookie] = useCookies(['ageGate'])
	const [day, setDay] = useState(`0`)
	const [mounth, setMounth] = useState(`0`)
	const [year, setYear] = useState(`0`)
	const [isRemember, setRemember] = useState(false)
	const [isAccess, setAccess] = useState(true)
	const [langueage, setLanguage] = useState('en')


	const handleClick = () => {
		if(isRemember) {
			let expiresDate = new Date()
			expiresDate.setDate(expiresDate.getDate() + 60)
			setCookie('ageGate', true, {expires: expiresDate})
		} else {
			setCookie('ageGate', true)
		}
	}
	const onClickConfirm = () => {
		const msIn18Years = 568025136000
		const nowDate = Date.now()
 		const inputDateInMs = Date.parse(`${year}-${mounth}-${day}`)
		const isLegal = nowDate - inputDateInMs >= msIn18Years ? true : false
		if(!isLegal) {
			setAccess(false)
		} else if(isLegal){
			handleClick()
		}
	}
	useEffect(() => {
		if (!cookies.ageGate) {
			setCookie('ageGate', false)
		}
	}, [])


	const optionChange = (evt: any) =>{
	setLanguage(evt.target.value)
	}

	return (
		<div>
			{cookies.ageGate == 'false' && (
				<div className={styles.ageGateWrapper}>
					<div className={styles.ageGateContainer}>
						<select className={styles.langChooser} onChange={optionChange}>
							<option selected={true} disabled>Choose your language</option>
							<option value={'fr'}>France</option>
							<option value={'en'}>English</option>
							<option value={'nl'}>Dutch</option>
						</select>
						<div className={`${styles.ageGateLogoContainer} flex`}>
								<img className={styles.logoImage} src="https://abibewebshop.vtexassets.com/assets/vtex.file-manager-graphql/images/e5d4e26a-37e0-4eab-a6b6-972645837c2a___162d0ac941edefc7a51aa1963ebbf111.png"></img>
						</div>
						{isAccess ? <div className={styles.ageGateUnderAge}>
							<p className={styles.logoText}>{langueage === 'en' ? `Are you over Legal Drinking Age?` : langueage === 'fr' ? `Avez-vous dépassé l'âge légal pour boire?` : `Bent u ouder dan de wettelijke drinkleeftijd?`}</p>
								<p  className={styles.ageQuestion}>{langueage === 'en' ? `Please enter your date of birth` : langueage === 'fr' ? 'Veuillez entrer votre date de naissance' : 'Voer je geboortedatum in'}</p>
							<div className={styles.inputContainer}>
							<input className={styles.dataInput} onChange={e => setDay(e.target.value)} autoFocus min={1} max={31} type="number" name="agegate-d" maxLength={2} placeholder="dd" tabIndex={0}></input>
							<input className={styles.dataInput} onChange={e => setMounth(e.target.value)} min={1} max={12} type="number" name="agegate-m" maxLength={2} placeholder="mm" tabIndex={0}></input>
							<input className={styles.dataInput} onChange={e => setYear(e.target.value)} min={0} type="number" name="agegate-y" maxLength={4} placeholder="yyyy" tabIndex={0}></input>
						</div>
							<input className={styles.checkboxRemember} id="remember" type="checkbox" onChange={()=> setRemember(!isRemember)}></input>
							<label htmlFor={'remember'} className={styles.ageLable}>{langueage === 'en' ? `Remember me` : langueage === 'fr' ? 'Souviens-toi de moi' : 'Onthoud mij'}</label>

							 <button className={styles.ageGateButton} onClick={onClickConfirm}>
								{langueage === 'en' ? `CONTINUE` : langueage === 'fr' ? 'CONTINUER' : 'DOORGAAN MET'}
						</button>
						</div> : <div><p className={styles.unswer}>{langueage === 'en' ? `Sorry, you must be 18 years or older to visit this website` : langueage === 'fr' ? 'Désolé, vous devez être âgé d`au moins 18 ans pour visiter ce site Web' : 'Sorry, je moet 18 jaar of ouder zijn om deze website te bezoeken'}</p></div>}
						<div className={styles.textContainer}>
							<p className={styles.descriptionBottomText}>{langueage === 'en' ? `© 2021 Anheuser-Busch InBev` : langueage === 'fr' ? '© 2021 Anheuser-Busch InBev' : '© 2021 Anheuser-Busch InBev'}</p>
							<p className={styles.descriptionBottomText}>{langueage === 'en' ? `A beer brewed with knowledge is tasted with wisdom` : langueage === 'fr' ? 'Une bière brassée avec savoir se déguste avec sagesse' : 'Een bier gebrouwen met kennis wordt met wijsheid geproefd'}</p>
							<p className={styles.descriptionBottomText}>{langueage === 'en' ? `Please do not share the content of this site with minors` : langueage === 'fr' ? 'Merci de ne pas partager le contenu de ce site avec des mineurs' : 'Deel de inhoud van deze site niet met minderjarigen'}</p>
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
