
import loader from '#styles/ui/loader.module.scss';

export default ({ className = ''}) => {
    return (
        <span className={loader.loader + className}></span>
    )
}