import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import Loading from '../../components/Loading';

const Profile: React.FC = () => {
    const {isAuthenticated, user} = useSelector((state: RootState) => state.user);

    if (!isAuthenticated || !user) {
        return <Loading/>;
    }

    return (
        <div className="min-h-screen p-4 bg-gray-100">
            <div className="max-w-4xl mx-auto pt-8 px-4 pb-4 bg-white shadow-md rounded-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="col-span-1 p-4 flex justify-center items-center">
                        <div
                            className="w-48 h-48 bg-blue-300 rounded-full flex justify-center items-center overflow-hidden">
                            <img
                                src={"/profile-pic.avif"}
                                alt={"Profile Pic"}
                                className={"object-cover"}
                            />
                        </div>
                    </div>
                    <div className="col-span-2 p-4">
                        <h2 className="text-2xl font-bold mb-4">Profile</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-600">First Name</label>
                                <p className="text-gray-800">{user.first_name}</p>
                            </div>
                            <div>
                                <label className="block text-gray-600">Last Name</label>
                                <p className="text-gray-800">{user.last_name}</p>
                            </div>
                            <div>
                                <label className="block text-gray-600">Email</label>
                                <p className="text-gray-800">{user.email}</p>
                            </div>
                            <div>
                                <label className="block text-gray-600">Phone Number</label>
                                <p className="text-gray-800">{user.phone_number ?? 'Not provided'}</p>
                            </div>
                            <div>
                                <label className="block text-gray-600">Base Address</label>
                                <p className="text-gray-800">{user.base_address ?? 'Not provided'}</p>
                            </div>
                            <div>
                                <label className="block text-gray-600">City</label>
                                <p className="text-gray-800">{user.city ?? 'Not provided'}</p>
                            </div>
                            <div>
                                <label className="block text-gray-600">State</label>
                                <p className="text-gray-800">{user.state ?? 'Not provided'}</p>
                            </div>
                            <div>
                                <label className="block text-gray-600">Joined on</label>
                                <p className="text-gray-800">{new Date(user.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    <h2 className="text-2xl font-semibold mb-4">Wishlist</h2>
                    <div className="bg-gray-200 p-4 rounded-lg">
                        <p className="text-gray-600">Wishlist products to show here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
