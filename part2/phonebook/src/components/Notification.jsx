const Notification = ({ message, messageType }) => {
	if (message === null) {
		return null
	}
	const classes = `${messageType} notification `

	return (
		<div className={classes}>
			{message}
		</div>
	)
}

export default Notification
