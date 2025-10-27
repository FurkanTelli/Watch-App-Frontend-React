import ToolbarComponent from '../toolbar/ToolbarComponent';
import Index from '../watchesList';

const HomePage = () => {

    return (
        <div className="card">
            <ToolbarComponent />
            <div className='m-4 border-2 border-round-sm shadow-4'>
                <Index />
            </div>
        </div>
    )
}

export default HomePage