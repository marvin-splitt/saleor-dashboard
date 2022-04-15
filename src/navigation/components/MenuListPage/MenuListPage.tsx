import { Button } from "@saleor/components/Button";
import Container from "@saleor/components/Container";
import PageHeader from "@saleor/components/PageHeader";
import { MenuFragment } from "@saleor/graphql";
import { sectionNames } from "@saleor/intl";
import { Backlink } from "@saleor/macaw-ui";
import { menuListUrl, MenuListUrlSortField } from "@saleor/navigation/urls";
import { ListActions, PageListProps, SortPage } from "@saleor/types";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import MenuList from "../MenuList";

export interface MenuListPageProps
  extends PageListProps,
    ListActions,
    SortPage<MenuListUrlSortField> {
  menus: MenuFragment[];
  onBack: () => void;
  onDelete: (id: string) => void;
}

const MenuListPage: React.FC<MenuListPageProps> = ({
  onBack,
  ...listProps
}) => {
  const intl = useIntl();
  const addUrl = menuListUrl({
    action: "add"
  });

  return (
    <Container>
      <Backlink onClick={onBack}>
        {intl.formatMessage(sectionNames.configuration)}
      </Backlink>
      <PageHeader title={intl.formatMessage(sectionNames.navigation)}>
        <Button variant="primary" href={addUrl} data-test-id="add-menu">
          <FormattedMessage
            defaultMessage="Create Menu"
            description="button"
            id="menuListPageAddMenu"
          />
        </Button>
      </PageHeader>
      <MenuList {...listProps} />
    </Container>
  );
};
MenuListPage.displayName = "MenuListPage";
export default MenuListPage;
