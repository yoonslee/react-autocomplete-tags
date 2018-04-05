import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './theme.css'

const TAG_SHAPE = PropTypes.shape({
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
})

export default class Suggestions extends PureComponent {

	static propTypes = {
		className: PropTypes.string,
		tags: PropTypes.oneOfType([
			PropTypes.arrayOf(TAG_SHAPE),
			PropTypes.arrayOf(PropTypes.string)
		]),
		suggestions: PropTypes.arrayOf(
			PropTypes.shape({
				label: PropTypes.string.isRequired,
				value: PropTypes.string.isRequired,
			})
		),
		onClick: PropTypes.func,
		focused: PropTypes.number,
		sortSuggestion: PropTypes.func,
		value: PropTypes.string,
	}

	static defaultProps = {
		className: '',
		tags: [],
		suggestions: [],
		onClick: ()=>{},
		sortSuggestion: ()=>true,
		value: '',
	}

	constructor(props){
		super(props)
	}

	render() {
		const { className, suggestions, sortSuggestion, tags, value } = this.props

		//Loader?
		if(!suggestions || !suggestions.length) return null

		//Sorted suggestions
		const sortedSuggestions = suggestions.sort((suggA, suggB) => {
			if(sortSuggestion(suggA.label, suggB.label)) {
				return true
			}
		})

		return (
			<div className={`${styles.dropdown} ${className}`}>
				<ul className={styles.suggestions}>
					{this._renderSuggestions(sortedSuggestions)}
				</ul>
			</div>
		)
	}

	_renderSuggestions = (suggestions) => {
		return (
			suggestions.map(({label}, idx) => {
				return (
					<li
						key={idx}
						onClick={this._onClick.bind(this, idx)}
						className={this.props.focused === idx ? styles.focused : null}
					>
						{label}
					</li>
				)
			})
		)
	}

	_onClick = idx => {
		this.setState({ suggestions: [] })
		this.props.onClick(idx)
	}

}