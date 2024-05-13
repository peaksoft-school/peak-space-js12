import scss from './Preloader.module.scss';
const Preloader = () => {
	return (
		<div className={scss.center}>
			<div className={scss.ring}></div>
			<span>PeakSpace</span>
		</div>
	);
};

export default Preloader;
