import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#d0d2d8",
    paddingTop: 62,

  },
  logo: {
    height: 34,
    width: 134
  },
  form: {
    width: "100%",
    paddingHorizontal: 16,
    gap: 7,
    marginTop: 32,
  },
  content: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingTop: 32,
    marginTop: 24,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#0000001A",
    paddingBottom: 12,
  },
  clearButton: {
    marginLeft: "auto",
  },
  clearText:{
    color: "#828282",
    fontSize: 14,
    fontWeight: 500,
    
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#0000001A",
  },
  listContent: {
    paddingTop: 24,
    paddingBottom: 62,
  },
  listEmpty: {
    fontSize: 14,
    fontWeight: 500,
    color: "#828282",
    textAlign: "center"
  }
});
