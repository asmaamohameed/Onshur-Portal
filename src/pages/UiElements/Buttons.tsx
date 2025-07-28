import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import { Icon } from "../../components/common/Icon";

export default function Buttons() {
  return (
    <div>
      <PageMeta
        title="Button Components | Onshur Portal"
        description="Interactive button components and call-to-action elements for Onshur Portal user interface"
      />
      <PageBreadcrumb pageTitle="Buttons" />
      <div className="space-y-5 sm:space-y-6">
        {/* Primary Button */}
        <ComponentCard title="Primary Button">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="primary">
              Button Text
            </Button>
            <Button size="md" variant="primary">
              Button Text
            </Button>
          </div>
        </ComponentCard>
        {/* Primary Button with Start Icon */}
        <ComponentCard title="Primary Button with Left Icon">
          <div className="flex items-center gap-5">
            <Button
              size="sm"
              variant="primary"
              startIcon={<Icon name="BoxIcon" className="size-5" />}
            >
              Button Text
            </Button>
            <Button
              size="md"
              variant="primary"
              startIcon={<Icon name="BoxIcon" className="size-5" />}
            >
              Button Text
            </Button>
          </div>
        </ComponentCard>
        {/* Primary Button with Start Icon */}
        <ComponentCard title="Primary Button with Right Icon">
          <div className="flex items-center gap-5">
            <Button
              size="sm"
              variant="primary"
              endIcon={<Icon name="BoxIcon" className="size-5" />}
            >
              Button Text
            </Button>
            <Button
              size="md"
              variant="primary"
              endIcon={<Icon name="BoxIcon" className="size-5" />}
            >
              Button Text
            </Button>
          </div>
        </ComponentCard>
        {/* Outline Button */}
        <ComponentCard title="Secondary Button">
          <div className="flex items-center gap-5">
            {/* Outline Button */}
            <Button size="sm" variant="outline">
              Button Text
            </Button>
            <Button size="md" variant="outline">
              Button Text
            </Button>
          </div>
        </ComponentCard>
        {/* Outline Button with Start Icon */}
        <ComponentCard title="Outline Button with Left Icon">
          <div className="flex items-center gap-5">
            <Button
              size="sm"
              variant="outline"
              startIcon={<Icon name="BoxIcon" className="size-5" />}
            >
              Button Text
            </Button>
            <Button
              size="md"
              variant="outline"
              startIcon={<Icon name="BoxIcon" className="size-5" />}
            >
              Button Text
            </Button>
          </div>
        </ComponentCard>{" "}
        {/* Outline Button with Start Icon */}
        <ComponentCard title="Outline Button with Right Icon">
          <div className="flex items-center gap-5">
            <Button
              size="sm"
              variant="outline"
              endIcon={<Icon name="BoxIcon" className="size-5" />}
            >
              Button Text
            </Button>
            <Button
              size="md"
              variant="outline"
              endIcon={<Icon name="BoxIcon" className="size-5" />}
            >
              Button Text
            </Button>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
}
