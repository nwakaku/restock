import { Button, Card, CardBody, CardHeader, Chip, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Tooltip, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { LuAlertCircle, LuCalendar, LuFileEdit, LuPackage, LuPause, LuPlay, LuPlus, LuTrash2 } from "react-icons/lu";


export function ManageSubscriptions() {

    const subscriptionData = [
      {
        id: 1,
        name: "Fresh Produce Box",
        items: 8,
        frequency: "weekly",
        nextDelivery: "2024-12-24",
        status: "active",
        image: "/api/placeholder/40/40",
      },
      {
        id: 2,
        name: "Pantry Essentials",
        items: 12,
        frequency: "biweekly",
        nextDelivery: "2024-12-30",
        status: "active",
        image: "/api/placeholder/40/40",
      },
      {
        id: 3,
        name: "Household Bundle",
        items: 5,
        frequency: "monthly",
        nextDelivery: "2025-01-15",
        status: "paused",
        image: "/api/placeholder/40/40",
      },
    ];

  const [subscriptions, setSubscriptions] = useState(subscriptionData);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSub, setSelectedSub] = useState(null);
  const [actionType, setActionType] = useState("");

  const handleStatusChange = (id) => {
    setSubscriptions((subs) =>
      subs.map((sub) => {
        if (sub.id === id) {
          return {
            ...sub,
            status: sub.status === "active" ? "paused" : "active",
          };
        }
        return sub;
      })
    );
  };

  const handleFrequencyChange = (id, newFrequency) => {
    setSubscriptions((subs) =>
      subs.map((sub) => {
        if (sub.id === id) {
          return { ...sub, frequency: newFrequency };
        }
        return sub;
      })
    );
  };

  const openActionModal = (sub, action) => {
    setSelectedSub(sub);
    setActionType(action);
    onOpen();
  };

  const getChipColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "paused":
        return "warning";
      default:
        return "default";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 lg:ml-64 px-4 sm:px-6 lg:px-8">
      <Card className="w-full">
        <CardHeader className="flex flex-col sm:flex-row justify-between gap-4 p-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Subscription Management
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your recurring deliveries
            </p>
          </div>
          <Button
            className="bg-gray-600 text-white"
            startContent={<LuPlus />}
            size="md">
            Add New
          </Button>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="overflow-x-auto">
            <div className="min-w-[800px] w-full">
              {/* Desktop Table View */}
              <table className="w-full hidden sm:table">
                <thead>
                  <tr className="text-left bg-gray-50">
                    <th className="p-4 text-sm font-medium text-gray-600">
                      Subscription
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-600">
                      Frequency
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-600">
                      Next Delivery
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-600">
                      Status
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub) => (
                    <tr
                      key={sub.id}
                      className="border-t hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-success/10 p-2 rounded-lg">
                            {" "}
                            <LuPackage className="h-5 w-5 text-success" />{" "}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">
                              {sub.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {sub.items} items
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Select
                          size="sm"
                          value={sub.frequency}
                          onChange={(e) =>
                            handleFrequencyChange(sub.id, e.target.value)
                          }
                          className="max-w-[140px]">
                          <SelectItem key="weekly">Weekly</SelectItem>
                          <SelectItem key="biweekly">Bi-weekly</SelectItem>
                          <SelectItem key="monthly">Monthly</SelectItem>
                        </Select>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <LuCalendar className="h-4 w-4" />
                          <span>{formatDate(sub.nextDelivery)}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Chip
                          color={getChipColor(sub.status)}
                          variant="flat"
                          size="sm">
                          {sub.status.charAt(0).toUpperCase() +
                            sub.status.slice(1)}
                        </Chip>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Tooltip content="Edit">
                            <Button
                              size="sm"
                              variant="flat"
                              isIconOnly
                              onClick={() => openActionModal(sub, "edit")}>
                              <LuFileEdit className="h-4 w-4" />
                            </Button>
                          </Tooltip>
                          <Tooltip
                            content={
                              sub.status === "active" ? "Pause" : "Resume"
                            }>
                            <Button
                              size="sm"
                              color={
                                sub.status === "active" ? "warning" : "success"
                              }
                              variant="flat"
                              isIconOnly
                              onClick={() => handleStatusChange(sub.id)}>
                              {sub.status === "active" ? (
                                <LuPause className="h-4 w-4" />
                              ) : (
                                <LuPlay className="h-4 w-4" />
                              )}
                            </Button>
                          </Tooltip>
                          <Tooltip content="Delete">
                            <Button
                              size="sm"
                              color="danger"
                              variant="flat"
                              isIconOnly
                              onClick={() => openActionModal(sub, "delete")}>
                              <LuTrash2 className="h-4 w-4" />
                            </Button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Card View */}
              <div className="sm:hidden space-y-4">
                {subscriptions.map((sub) => (
                  <Card key={sub.id} className="w-full">
                    <CardBody className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                          <img
                            src={sub.image}
                            alt={sub.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-medium text-gray-800">
                              {sub.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {sub.items} items
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <LuCalendar className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">
                                {formatDate(sub.nextDelivery)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Chip
                          color={getChipColor(sub.status)}
                          variant="flat"
                          size="sm">
                          {sub.status.charAt(0).toUpperCase() +
                            sub.status.slice(1)}
                        </Chip>
                      </div>
                      <Divider className="my-3" />
                      <div className="flex items-center justify-between">
                        <Select
                          size="sm"
                          value={sub.frequency}
                          onChange={(e) =>
                            handleFrequencyChange(sub.id, e.target.value)
                          }
                          className="max-w-[140px]">
                          <SelectItem key="weekly">Weekly</SelectItem>
                          <SelectItem key="biweekly">Bi-weekly</SelectItem>
                          <SelectItem key="monthly">Monthly</SelectItem>
                        </Select>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="flat"
                            isIconOnly
                            onClick={() => openActionModal(sub, "edit")}>
                            <LuFileEdit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            color={
                              sub.status === "active" ? "warning" : "success"
                            }
                            variant="flat"
                            isIconOnly
                            onClick={() => handleStatusChange(sub.id)}>
                            {sub.status === "active" ? (
                              <LuPause className="h-4 w-4" />
                            ) : (
                              <LuPlay className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            color="danger"
                            variant="flat"
                            isIconOnly
                            onClick={() => openActionModal(sub, "delete")}>
                            <LuTrash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Action Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {actionType === "delete"
                  ? "Cancel Subscription"
                  : "Edit Subscription"}
              </ModalHeader>
              <ModalBody>
                {actionType === "delete" ? (
                  <div className="flex items-start gap-3">
                    <LuAlertCircle className="h-5 w-5 text-danger mt-1" />
                    <div>
                      <p>
                        Are you sure you want to cancel your subscription to:
                      </p>
                      <p className="font-medium">{selectedSub?.name}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        {
                          "This action cannot be undone. You'll need to create a new subscription if you want to resume deliveries."
                        }
                      </p>
                    </div>
                  </div>
                ) : (
                  <p>Edit subscription options for {selectedSub?.name}</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color={actionType === "delete" ? "danger" : "primary"}
                  onPress={onClose}>
                  {actionType === "delete"
                    ? "Yes, Cancel Subscription"
                    : "Save Changes"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
