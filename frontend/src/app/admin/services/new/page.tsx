import { createService } from "../../actions/services";
import { ServiceForm } from "../../service-form";

export default function NewServicePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Create New Service</h1>
        <p className="text-sm text-white/50 mt-1">
          Add a new service offering to your website.
        </p>
      </div>
      <ServiceForm action={createService} />
    </div>
  );
}
