import * as React from 'react';
import { useParams } from 'react-router-dom';

import ProfileCardSideFeature from '../../components/Profile/ProfileCardSideFeature';
import ProfileDetail from '../../components/Profile/ProfileDetail';

export default function ProfilePage() {
    const { userId } = useParams()

    return (
        <>
            <ProfileCardSideFeature userId={userId} />
            <ProfileDetail userId={userId} />
        </>
    )
};
