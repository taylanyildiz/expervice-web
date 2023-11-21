import { Avatar, IconButton } from "@mui/material";
import { useCompanyDialog, useUser } from "../helper/company_helper";
import Colors from "@Themes/colors";
import { caption } from "@Utils/functions";
import EditIcon from "@mui/icons-material/Edit";

function CompanyAvatar() {
  const { company } = useUser();
  const image = company?.company_image?.image_url;

  /// Company Dialog hook
  const { openCompanyImageDialog } = useCompanyDialog();

  const handleEditImage = () => {
    openCompanyImageDialog();
  };

  return (
    <div className="company-avatar">
      <Avatar
        sx={{
          width: 100,
          height: 100,
          color: "white",
          backgroundColor: Colors.primary,
        }}
        alt={company?.name}
        children={caption(company?.name)}
        src={image}
      />
      <div className="company-avatar-btn">
        <IconButton onClick={handleEditImage}>
          <EditIcon sx={{ width: 15, height: 15 }} />
        </IconButton>
      </div>
    </div>
  );
}

export default CompanyAvatar;
