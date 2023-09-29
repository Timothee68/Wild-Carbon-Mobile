import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "@rneui/base";
import { CREATE_EXPENSE } from "../../src/gql/ExpenseGql";
import {
  GET_ALL_CATEGORIES,
  GET_CATEGORY_AND_ITEM,
} from "../../src/gql/CategorieGql";
import Category, { CategoryItemType } from "../../src/types/CategoryType";
import * as Yup from "yup";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function Expense() {
  const [openInputLabel, setOpenInputLabel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  const [info, setInfo] = useState(false);

  // Fetch
  const [fetchCategories, { data: dataCategory }] = useLazyQuery<{
    getAllCategory: Category[];
  }>(GET_ALL_CATEGORIES);

  const [fetchItems, { data: dataItems }] = useLazyQuery<{
    getCategory: CategoryItemType;
  }>(GET_CATEGORY_AND_ITEM);

  const [createExpense, { loading, error }] = useMutation(CREATE_EXPENSE, {
    onCompleted: () => {
      setShowSuccessAlert(true);
      //   onSubmitSuccess();
    },
    onError: () => {
      //   onSubmitSuccess();
      setShowSuccessAlert(false);
    },
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // handle
  const handleSelectCategory = async (categoryId: string) => {
    try {
      setSelectedCategory(categoryId);
      fetchItems({
        variables: { categoryId },
      });
    } catch (error) {
      console.error("Problème:", error);
    }
  };

  // const validationSchema = Yup.object({
  //   title: Yup.string().required("Tu nous as pas dit ce que tu as fait."),
  //   date: Yup.string().required("Tu nous as pas dit quand c'était."),
  //   quantity: Yup.number().required("Tu as oublié le principal."),
  //   itemId: Yup.string().required("Tu as oublié l'item."),
  // });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    console.log("Expense error: ", error);
    return <Text>{error.message}</Text>;
  }

  return (
    <View>
      <View>
        <TouchableOpacity onPress={() => setInfo(true)}>
          <Ionicons
            name="alert-circle-outline"
            style={{ color: "#3C8962" }}
            size={30}
          />
        </TouchableOpacity>

        <Modal
          visible={info}
          style={styles.modal}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalView}>
            <Text style={[styles.textInfo, styles.textInfoTitle]}>
              Balance ta dépense
            </Text>
            <Text style={styles.textInfo}>
              Remplis simplement ce formulaire, en choisissant une catégorie, un
              titre, l'associer à un élément puis indiquer une quantité.
            </Text>
            <Text style={styles.textInfo}>
              Ta quantité d'émission sera alors calculer après validation que tu
              pourra retrouver sur ton dashboard.
            </Text>
            <Pressable style={styles.button} onPress={() => setInfo(!info)}>
              <Ionicons
                name="close-outline"
                style={{ color: "white" }}
                size={30}
              />
            </Pressable>
          </View>
        </Modal>
      </View>
      <View>
        <Text>Balance ton carbone !</Text>
        <Text>
          Allez, dis nous tout ! Et pas d'entourloupe, la planète le saura...
        </Text>
      </View>

      <View style={styles.centeredView}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Quel type d'activité as-tu réalisé ?</Text>

          <Picker
            placeholder="Quel type d'activité as-tu réalisé ?"
            selectedValue={selectedCategory}
            onValueChange={(value) => {
              handleSelectCategory(value);
              setOpenInputLabel(true);
            }}
          >
            {dataCategory?.getAllCategory.map((cat) => {
              let icon;
              switch (cat.name) {
                case "Food":
                  icon = <Ionicons name="restaurant-outline" />;
                  break;
                case "Transport":
                  icon = <Ionicons name="train-outline" />;
                  break;
                case "Housing":
                  icon = <Ionicons name="home-outline" />;
                  break;
                case "Energy":
                  icon = <Ionicons name="flash-outline" />;
                  break;
                default:
                  icon = <Ionicons name="help-outline" />;
                  break;
              }
              return (
                <Picker.Item label={cat.name} value={cat.id} key={cat.id} />
              );
            })}
          </Picker>
        </View>

        <Formik
          initialValues={{
            title: "",
            quantity: 0,
            itemId: "",
            date: new Date(),
          }}
          // onSubmit={(values) => console.log(values)}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            console.log("valeurs soumises:", values);
            await createExpense({
              variables: {
                date: values.date,
                quantity: values.quantity,
                title: values.title,
                itemId: values.itemId,
              },
            });
            setSubmitting(false);
            resetForm();
          }}
          // validationSchema={validationSchema}
        >
          {({
            errors,
            values,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
          }): JSX.Element => (
            <View>
              {/* {openInputLabel && ( */}
              <View>
                <View style={styles.inputTitle}>
                  <TextInput
                    value={values.title}
                    onChangeText={handleChange("title")}
                    placeholder="Qu'est ce que tu as fait de beau ?"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    Choisis ce qui correspond à ton activité
                  </Text>

                  <Picker
                    placeholder="Choisis ce qui correspond à ton activité ?"
                    selectedValue={values.itemId}
                    onValueChange={(value) => {
                      setFieldValue("itemId", value);
                    }}
                  >
                    {dataItems?.getCategory.items.map((item) => {
                      return (
                        <Picker.Item
                          label={item.label}
                          value={item.id}
                          key={item.id}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>

              <View style={styles.datePicker}>
                <TouchableOpacity
                  onPress={() => setDatePickerVisible(true)}
                  style={styles.buttonDate}
                >
                  <Ionicons
                    name="calendar-outline"
                    style={{ color: "white" }}
                    size={16}
                  />
                </TouchableOpacity>

                {isDatePickerVisible && (
                  <DateTimePicker
                    dateFormat="day month year"
                    value={values.date}
                    onChange={(event, selectedDate) => {
                      const chosenDate = selectedDate || values.date;
                      const day = chosenDate
                        .getDate()
                        .toString()
                        .padStart(2, "0");
                      const month = (chosenDate.getMonth() + 1) // Les mois sont 0-indexés, donc +1
                        .toString()
                        .padStart(2, "0");
                      const year = chosenDate.getFullYear();
                      const formattedDate = `${day}/${month}/${year}`;

                      setFieldValue("date", chosenDate);
                      setDatePickerVisible(false);
                      setCurrentDate(formattedDate);
                    }}
                  />
                )}

                <View style={styles.inputDate}>
                  <Text style={styles.label}>Mais non ? Quand ça ?</Text>
                  <TextInput placeholder="JJ/MM/AA" value={currentDate} />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>En quelle quantité ??</Text>
                <TextInput
                  value={values.quantity.toString()}
                  onChangeText={handleChange("quantity")}
                  placeholder="En km, g, L"
                />
              </View>

              <Button
                title="Soumettre"
                onPress={() => {
                  handleSubmit();
                  console.log(values);
                }}
              />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    gap: 5,
  },
  buttonInfo: {
    position: "absolute",
    flex: 1,
  },
  inputContainer: {
    borderColor: "#3C8962",
    borderWidth: 2,
    padding: 3,
    width: 300,
    marginBottom: 5,
  },
  inputTitle: {
    borderColor: "#3C8962",
    borderWidth: 2,
    padding: 15,
    marginBottom: 10,
  },
  inputDate: {
    borderColor: "#3C8962",
    borderWidth: 2,
    padding: 3,
    width: 250,
  },
  buttonDate: {
    backgroundColor: "#A98E60",
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: "#A98E60",
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 300,
    gap: 10,
    marginBottom: 10,
  },
  label: {
    fontFamily: "Roboto",
    color: "#A98E60",
    fontStyle: "italic",
    fontWeight: "100",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    marginTop: "50%",
    gap: 5,
    backgroundColor: "#D7CBB5",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  textInfo: {
    fontFamily: "Roboto",
    fontWeight: "200",
    fontSize: 15,
  },
  textInfoTitle: {
    color: "#3C8962",
    fontWeight: "bold",
    fontSize: 18,
    fontStyle: "italic",
  },
});
