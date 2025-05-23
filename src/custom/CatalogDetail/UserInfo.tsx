import { Avatar } from '../../base';
import { MESHERY_CLOUD_PROD } from '../../constants/constants';
import { LockIcon, PublicIcon } from '../../icons';
import { getFormatDate } from '../../utils';
import { Pattern } from '../CustomCatalog/CustomCard';
import { getVersion } from '../CustomCatalog/Helper';
import { VisibilityChipMenu } from '../VisibilityChipMenu';
import { VIEW_VISIBILITY } from '../VisibilityChipMenu/VisibilityChipMenu';
import { ContentDetailsPoints, ContentDetailsText, ContentRow, RedirectLink } from './style';
import { UserProfile } from './types';

interface UserInfoProps {
  details: Pattern;
  showVersion?: boolean;
  userProfile?: UserProfile;
  isVisibilityEnabled: boolean;
  handleVisibilityChange: (visibility: VIEW_VISIBILITY) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({
  details,
  showVersion = true,
  userProfile,
  isVisibilityEnabled,
  handleVisibilityChange
}) => {
  return (
    <>
      <ContentRow>
        <ContentDetailsPoints>CREATED BY</ContentDetailsPoints>
        <ContentDetailsText
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px'
          }}
        >
          <Avatar
            src={userProfile?.avatar_url}
            alt={`${userProfile?.first_name} ${userProfile?.last_name}`}
            style={{
              height: '28px',
              width: '28px'
            }}
          />
          <RedirectLink
            href={`${MESHERY_CLOUD_PROD}/user/${details?.user_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span style={{ fontWeight: 'normal' }}>
              {userProfile?.first_name} {userProfile?.last_name}
            </span>
          </RedirectLink>
        </ContentDetailsText>
      </ContentRow>
      <ContentRow>
        <ContentDetailsPoints>CREATED AT</ContentDetailsPoints>
        <ContentDetailsText>{getFormatDate(details?.created_at.toString())}</ContentDetailsText>
      </ContentRow>
      <ContentRow>
        <ContentDetailsPoints>UPDATED AT</ContentDetailsPoints>
        <ContentDetailsText>{getFormatDate(details?.updated_at.toString())}</ContentDetailsText>
      </ContentRow>
      {showVersion && (
        <ContentRow>
          <ContentDetailsPoints>VERSION</ContentDetailsPoints>
          <ContentDetailsText>{getVersion(details)}</ContentDetailsText>
        </ContentRow>
      )}
      <ContentRow>
        <ContentDetailsPoints>VISIBILITY</ContentDetailsPoints>
        <VisibilityChipMenu
          value={details?.visibility as VIEW_VISIBILITY}
          onChange={(value) => handleVisibilityChange(value as VIEW_VISIBILITY)}
          enabled={isVisibilityEnabled}
          options={[
            [VIEW_VISIBILITY.PUBLIC, PublicIcon],
            [VIEW_VISIBILITY.PRIVATE, LockIcon]
          ]}
        />
      </ContentRow>
    </>
  );
};

export default UserInfo;
