import { DialogCustomTitle, LoadingComp } from "@Components/index";
import { useUser } from "@Features/summary/company/helper/company_helper";
import TranslateHelper from "@Local/index";
import Language from "@Models/languages";
import ConstantRepository from "@Repo/constant_repository";
import UserRepository from "@Repo/user_repository";
import { RootState } from "@Store/index";
import { useDialog } from "@Utils/hooks/dialog_hook";
import {
  Box,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function LanguageDialog() {
  /// constant store - Languages
  const { languages } = useSelector((state: RootState) => state.constant);
  const loading = !languages || languages.length === 0;

  /// Dialog hook
  const { openLoading } = useDialog();

  /// Constant repository
  const constantRepo = new ConstantRepository();

  /// User repository
  const userRepo = new UserRepository();

  /// User store
  const { language } = useUser();
  const lngId = language?.id;
  const lng = language?.language_code ?? "en";

  /// Initialize component
  useEffect(() => {
    if (!loading) return;
    constantRepo.getLanguages();
  }, []);

  /// Handle change language
  const handleChangeLang = async (language: Language) => {
    await openLoading(async () => {
      return userRepo.updateUserLanguage(language);
    });
  };

  return (
    <>
      <DialogCustomTitle title={TranslateHelper.languages()} />
      <DialogContent>
        <Box mt={1} p={1} sx={{ backgroundColor: "white" }}>
          <LoadingComp height={300} loading={loading}>
            <List>
              {languages.map((language, index) => (
                <ListItem key={`lng-${index}`} disablePadding>
                  <ListItemButton
                    onClick={() => handleChangeLang(language)}
                    selected={language.id === lngId}
                  >
                    <ListItemText
                      primary={`${language.emoji} ${language.translations?.name?.[lng]}`}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </LoadingComp>
        </Box>
      </DialogContent>
    </>
  );
}

export default LanguageDialog;
