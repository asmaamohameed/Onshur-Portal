import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Badge from "../../components/ui/badge/Badge";
import { Icon } from "../../components/common/Icon";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";

export default function Badges() {
  return (
    <div>
      <PageMeta
        title="React.js Badges Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Badges Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Badges" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="With Light Background">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            {/* Light Variant */}
            <Badge variant="light" color="primary">
              Primary
            </Badge>
            <Badge variant="light" color="success">
              Success
            </Badge>{" "}
            <Badge variant="light" color="error">
              Error
            </Badge>{" "}
            <Badge variant="light" color="warning">
              Warning
            </Badge>{" "}
            <Badge variant="light" color="info">
              Info
            </Badge>
            <Badge variant="light" color="light">
              Light
            </Badge>
            <Badge variant="light" color="dark">
              Dark
            </Badge>
          </div>
        </ComponentCard>
        <ComponentCard title="With Solid Background">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            {/* Light Variant */}
            <Badge variant="solid" color="primary">
              Primary
            </Badge>
            <Badge variant="solid" color="success">
              Success
            </Badge>{" "}
            <Badge variant="solid" color="error">
              Error
            </Badge>{" "}
            <Badge variant="solid" color="warning">
              Warning
            </Badge>{" "}
            <Badge variant="solid" color="info">
              Info
            </Badge>
            <Badge variant="solid" color="light">
              Light
            </Badge>
            <Badge variant="solid" color="dark">
              Dark
            </Badge>
          </div>
        </ComponentCard>
        <ComponentCard title="Light Background with Left Icon">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            <Badge variant="light" color="primary" startIcon={<Icon name="Plus" />}>
              Primary
            </Badge>
            <Badge variant="light" color="success" startIcon={<Icon name="Plus" />}>
              Success
            </Badge>{" "}
            <Badge variant="light" color="error" startIcon={<Icon name="Plus" />}>
              Error
            </Badge>{" "}
            <Badge variant="light" color="warning" startIcon={<Icon name="Plus" />}>
              Warning
            </Badge>{" "}
            <Badge variant="light" color="info" startIcon={<Icon name="Plus" />}>
              Info
            </Badge>
            <Badge variant="light" color="light" startIcon={<Icon name="Plus" />}>
              Light
            </Badge>
            <Badge variant="light" color="dark" startIcon={<Icon name="Plus" />}>
              Dark
            </Badge>
          </div>
        </ComponentCard>
        <ComponentCard title="Solid Background with Left Icon">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            <Badge variant="solid" color="primary" startIcon={<Icon name="Plus" />}>
              Primary
            </Badge>
            <Badge variant="solid" color="success" startIcon={<Icon name="Plus" />}>
              Success
            </Badge>{" "}
            <Badge variant="solid" color="error" startIcon={<Icon name="Plus" />}>
              Error
            </Badge>{" "}
            <Badge variant="solid" color="warning" startIcon={<Icon name="Plus" />}>
              Warning
            </Badge>{" "}
            <Badge variant="solid" color="info" startIcon={<Icon name="Plus" />}>
              Info
            </Badge>
            <Badge variant="solid" color="light" startIcon={<Icon name="Plus" />}>
              Light
            </Badge>
            <Badge variant="solid" color="dark" startIcon={<Icon name="Plus" />}>
              Dark
            </Badge>
          </div>
        </ComponentCard>
        <ComponentCard title="Light Background with Right Icon">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            <Badge variant="light" color="primary" endIcon={<Icon name="Plus" />}>
              Primary
            </Badge>
            <Badge variant="light" color="success" endIcon={<Icon name="Plus" />}>
              Success
            </Badge>{" "}
            <Badge variant="light" color="error" endIcon={<Icon name="Plus" />}>
              Error
            </Badge>{" "}
            <Badge variant="light" color="warning" endIcon={<Icon name="Plus" />}>
              Warning
            </Badge>{" "}
            <Badge variant="light" color="info" endIcon={<Icon name="Plus" />}>
              Info
            </Badge>
            <Badge variant="light" color="light" endIcon={<Icon name="Plus" />}>
              Light
            </Badge>
            <Badge variant="light" color="dark" endIcon={<Icon name="Plus" />}>
              Dark
            </Badge>
          </div>
        </ComponentCard>
        <ComponentCard title="Solid Background with Right Icon">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            <Badge variant="solid" color="primary" endIcon={<Icon name="Plus" />}>
              Primary
            </Badge>
            <Badge variant="solid" color="success" endIcon={<Icon name="Plus" />}>
              Success
            </Badge>{" "}
            <Badge variant="solid" color="error" endIcon={<Icon name="Plus" />}>
              Error
            </Badge>{" "}
            <Badge variant="solid" color="warning" endIcon={<Icon name="Plus" />}>
              Warning
            </Badge>{" "}
            <Badge variant="solid" color="info" endIcon={<Icon name="Plus" />}>
              Info
            </Badge>
            <Badge variant="solid" color="light" endIcon={<Icon name="Plus" />}>
              Light
            </Badge>
            <Badge variant="solid" color="dark" endIcon={<Icon name="Plus" />}>
              Dark
            </Badge>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
}
