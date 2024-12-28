import { OwnableBadge } from './NFTChecker';
import BadgeImage from './BadgeImage';
import Link from 'next/link';

const BadgeCard: React.FC<OwnableBadge> = ({
    owned_status,
    name,
    image_url,
    contract_address,
}) => {
    return (
        <div className={`relative space-y-2 p-4 rounded-lg border w-full transform transition-transform ${owned_status === 'loading' ? 'card-gradient-loading opacity-50' :
            owned_status === 'owned' ? 'card-gradient-success hover:shadow-2xl hover:shadow-green-800/50 '
                : 'card-gradient-danger hover:shadow-2xl hover:shadow-red-800/50 transform  '
            } text-white ${owned_status === 'loading' ? '' : ''
            }`}>

            {owned_status !== 'error' ? <StatusBadge owned_status={owned_status} /> : (
                // error logo in absolute position
                <div className="absolute z-30 top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-70 rounded-lg">
                    <p className="text-red-400 font-bold text-lg">
                        Oops
                    </p>
                    <p className='text-sm'>
                        Error fetching data
                    </p>
                </div>
            )}
            <BadgeImage name={name} image_url={image_url} owned={owned_status === 'owned'} />
            <div className="flex flex-col justify-center text-center">
                <p className="text-base md:text-lg font-semibold">
                    {name}
                </p>
                <Link
                    href={`https://explorer.story.foundation/collections/${contract_address}`}
                    className="text-xs md:text-sm text-blue-400 hover:underline"
                    target='_blank'
                >
                    View on Explorer
                </Link>
            </div>
        </div>
    );
};

export default BadgeCard;


const StatusBadge = ({ owned_status }: { owned_status: OwnableBadge['owned_status'] }) => {
    return (
        <div className={`absolute z-30 top-2 text-white right-2 p-1 rounded-lg text-xs md:text-sm ${owned_status === 'owned' ? 'gradient-2' :
            owned_status === 'notOwned' ? 'gradient-3' : ''
            }`
        }>
            {owned_status === 'loading' ? (
                <Spinner />
            ) : owned_status === 'error' ? (
                <p className="">Error fetching data</p>
            ) : owned_status === 'owned' ? (
                <p className="font-bold ">Owned</p>
            ) : owned_status === 'notOwned' ? (
                <p className="font-bold ">Not Owned</p>
            ) : null
            }
        </div>
    )
}


const Spinner = () => {
    return (
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-t-2 border-white"></div>
    );
};
