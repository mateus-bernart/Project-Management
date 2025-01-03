import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "../Task/TasksTable";

export default function Show({ auth, success, project, tasks, queryParams }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex itens-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 leading-tight">
            {`Project "${project.name}"`}
          </h2>
          <Link
            href={route("project.edit", project.id)}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Edit Project
          </Link>
        </div>
      }
    >
      <Head title="Projects" />

      <div className="pb-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <img
              src={project.image_path}
              alt=""
              className="w-full h-64 object-cover"
            />
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div>
                <div className="grid gap-1 grid-cols-2 mt-2">
                  <div>
                    <div>
                      <label className="font-bold text-lg">Project ID</label>
                      <p className="mt-1">{project.id}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Project Name</label>
                      <p className="mt-1">{project.name}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">
                        Project Status
                      </label>
                      <p>
                        <span
                          className={
                            "px-2 py-1 rounded text-dark" +
                            PROJECT_STATUS_CLASS_MAP[project.status]
                          }
                        >
                          {PROJECT_STATUS_TEXT_MAP[project.status]}
                        </span>
                      </p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Created By</label>
                      <p className="mt-1">{project.createdBy.name}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label className="font-bold text-lg">Due Date</label>
                      <p className="mt-1">{project.due_date}</p>
                    </div>
                    <div>
                      <label className="font-bold text-lg">Create Date</label>
                      <p className="mt-1">{project.created_at}</p>
                    </div>
                    <div>
                      <label className="font-bold text-lg">Updated By</label>
                      <p className="mt-1">{project.updatedBy.name}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="font-bold text-lg">
                    Project Description
                  </label>
                  <p className="mt-1">{project.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="py-10">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                  <TasksTable
                    hideProjectColumn={true}
                    tasks={tasks}
                    queryParams={queryParams}
                    success={success}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
