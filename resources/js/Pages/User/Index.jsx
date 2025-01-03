import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, users, queryParams = null, success }) {
  queryParams = queryParams || {};

  //generalistic search field function
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    //return to user page with the option value in the select
    router.get(route("user.index"), queryParams);
  };

  const onKeyPress = (value, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(value, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      //default sort
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("user.index"), queryParams);
  };

  const deleteUser = (user) => {
    if (!window.confirm("Are you sure you want to delete the user?")) {
      return;
    }
    router.delete(route("user.destroy", user.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Users
          </h2>
          <Link
            href={route("user.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new user
          </Link>
        </div>
      }
    >
      <Head title="Users" />

      <div className="py-12">
        <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
              {success}
            </div>
          )}
          <div className="overflow-hidden bg-dark shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className=" text-nowrap">
                    <TableHeading
                      name="id"
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      ID
                    </TableHeading>
                    <TableHeading
                      name="name"
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      Name
                    </TableHeading>
                    <TableHeading
                      name="email"
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      Email
                    </TableHeading>
                    <TableHeading
                      name="created_at"
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      Create Date
                    </TableHeading>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className=" text-nowrap">
                    <th className="px-4 py-3"></th>

                    <th className="px-4 py-3">
                      <TextInput
                        className="w-full"
                        defaultValue={queryParams.name}
                        placeholder="User Name"
                        onBlur={(e) =>
                          searchFieldChanged("name", e.target.value)
                        }
                        onKeyPress={(e) => onKeyPress("name", e)}
                      />
                    </th>
                    <th className="px-4 py-3">
                      <TextInput
                        className="w-full"
                        defaultValue={queryParams.email}
                        placeholder="User Email"
                        onBlur={(e) =>
                          searchFieldChanged("email", e.target.value)
                        }
                        onKeyPress={(e) => onKeyPress("email", e)}
                      />
                    </th>
                    <th className="px-4 py-3"></th>
                    <th className="px-4 py-3 text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.data.map((user) => (
                    <tr
                      key={user.id}
                      className="bg-dark border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-3 py-2">{user.id}</td>
                      <th className="px-3 py-2 text-gray text-nowrap">
                        {user.name}
                      </th>
                      <td className="px-3 py-2">{user.email}</td>
                      <td className="px-3 py-2">{user.created_at}</td>
                      <td className="px-3 py-2 text-nowrap">
                        <Link
                          href={route("user.edit", user.id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={(e) => deleteUser(user)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-dark border-b dark:bg-gray-800 dark:border-gray-700">
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <Pagination links={users.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
