import { Card } from "@material-ui/core";
import { Button } from "@saleor/components/Button";
import { Container } from "@saleor/components/Container";
import FilterBar from "@saleor/components/FilterBar";
import LimitReachedAlert from "@saleor/components/LimitReachedAlert";
import PageHeader from "@saleor/components/PageHeader";
import { RefreshLimitsQuery, StaffListQuery } from "@saleor/graphql";
import { sectionNames } from "@saleor/intl";
import { Backlink } from "@saleor/macaw-ui";
import { StaffListUrlSortField } from "@saleor/staff/urls";
import {
  FilterPageProps,
  ListProps,
  RelayToFlat,
  SortPage,
  TabPageProps
} from "@saleor/types";
import { hasLimits, isLimitReached } from "@saleor/utils/limits";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import StaffList from "../StaffList/StaffList";
import {
  createFilterStructure,
  StaffFilterKeys,
  StaffListFilterOpts
} from "./filters";

export interface StaffListPageProps
  extends ListProps,
    FilterPageProps<StaffFilterKeys, StaffListFilterOpts>,
    SortPage<StaffListUrlSortField>,
    TabPageProps {
  limits: RefreshLimitsQuery["shop"]["limits"];
  staffMembers: RelayToFlat<StaffListQuery["staffUsers"]>;
  onAdd: () => void;
  onBack: () => void;
}

const StaffListPage: React.FC<StaffListPageProps> = ({
  currentTab,
  filterOpts,
  initialSearch,
  limits,
  onAdd,
  onAll,
  onBack,
  onFilterChange,
  onSearchChange,
  onTabChange,
  onTabDelete,
  onTabSave,
  tabs,
  ...listProps
}) => {
  const intl = useIntl();

  const structure = createFilterStructure(intl, filterOpts);
  const reachedLimit = isLimitReached(limits, "staffUsers");

  return (
    <Container>
      <Backlink onClick={onBack}>
        {intl.formatMessage(sectionNames.configuration)}
      </Backlink>
      <PageHeader
        title={intl.formatMessage(sectionNames.staff)}
        limitText={
          hasLimits(limits, "staffUsers") &&
          intl.formatMessage(
            {
              defaultMessage: "{count}/{max} members",
              description: "used staff users counter"
            },
            {
              count: limits.currentUsage.staffUsers,
              max: limits.allowedUsage.staffUsers
            }
          )
        }
      >
        <Button
          data-test-id="invite-staff-member"
          disabled={reachedLimit}
          variant="primary"
          onClick={onAdd}
        >
          <FormattedMessage
            defaultMessage="Invite staff member"
            description="button"
          />
        </Button>
      </PageHeader>
      {reachedLimit && (
        <LimitReachedAlert
          title={intl.formatMessage({
            defaultMessage: "Staff Member limit reached",
            description: "alert"
          })}
        >
          <FormattedMessage defaultMessage="You have reached your staff member limit, you will be no longer able to add staff members to your store. If you would like to up your limit, contact your administration staff about raising your limits." />
        </LimitReachedAlert>
      )}
      <Card>
        <FilterBar
          allTabLabel={intl.formatMessage({
            defaultMessage: "All Staff Members",
            description: "tab name"
          })}
          currentTab={currentTab}
          filterStructure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={intl.formatMessage({
            defaultMessage: "Search Staff Member"
          })}
          tabs={tabs}
          onAll={onAll}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <StaffList {...listProps} />
      </Card>
    </Container>
  );
};
StaffListPage.displayName = "StaffListPage";
export default StaffListPage;
