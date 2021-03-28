import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getCourses, addCourse } from '../../redux/actions/courses';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../constants/theme';
import Foot from '../../components/foot';
import AppSnackBar from '../../components/snackbar';
import Loading from '../../components/loading';

export default function CourseScreen({ navigation }) {

    //Header for search bar
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Search
                    searchOpen={searchOpen}
                    color={theme.colors.blue}
                    onPress={() => { setSearchOpen(!searchOpen); updateSearch(''); }}
                    onChangeText={text => updateSearch(text)}
                    search={search}
                />
            )
        })
    })

    //Constants
    //const visible = useSelector(state => state.forumReducer.snackBarVisible);
    //const message = useSelector(state => state.forumReducer.snackBarMessage);
    const [search, setSearch] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [coursesFiltered, setCoursesFiltered] = useState([]);
    const courses = useSelector(state => state.courseReducer.courses);
    const courseLoaded = useSelector(state => state.courseReducer.courseLoaded);
    const dispatch = useDispatch();
    const fetchCourses = () => dispatch(getCourses());
    //const deleteOneTopic = (index) => dispatch(deleteTopic(index));
    //const removeSnackBar = () => dispatch(setVisibleFalse());

    useEffect(() => {
        fetchCourses();
        setCoursesFiltered(courses);
    }, [!courseLoaded])

    const updateSearch = (text) => {
        setSearch(text);
        setCoursesFiltered(courses.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())));
    }

    const showCourses = () => {
        return coursesFiltered.map((course, index) => {
            return (
                <TouchableOpacity
                    key={index}
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                //onPress={() => { navigation.navigate('ChatRoom', topic) }}
                //onLongPress={() => { deleteOneTopic(topic.id) }}
                >
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', width: '90%', flexDirection: 'row', backgroundColor: theme.colors.lightBlue, borderRadius: theme.borderRadius.card, margin: 10, padding: 10 }}>
                        <View>
                            <Text style={{ fontSize: theme.fontSizes.cardTitle, fontFamily: theme.fonts.bold }}>{course.name}</Text>
                            <Text style={{ fontSize: theme.fontSizes.cardText, fontFamily: theme.fonts.regular }}>{course.university}</Text>
                            <Text style={{ fontSize: theme.fontSizes.cardText, fontFamily: theme.fonts.regular }}>{course.teacher}</Text>
                        </View>
                        <Icon name={"chevron-right"}
                            size={20}
                            color="black" />
                    </View>

                </TouchableOpacity>
            )

        })
    }


    if (courseLoaded) {
        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <ScrollView style={{ width: '100%' }}>
                        {showCourses()}
                    </ScrollView>
                </View>
                {/* <AppSnackBar
                    visible={visible}
                    onDismiss={() => removeSnackBar()}
                    message={message}
                    color={theme.colors.orange}
                /> */}
                <Foot
                    color={theme.colors.blue}
                    icon="plus-circle"
                    textTop="You want to create a new course?"
                    textBottom="No problem! Create one here"
                    iconAction={() => { navigation.navigate('AddCourse') }}
                />
                <StatusBar style="auto" />
            </View>
        );
    }
    else {
        return (
            <Loading />
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    listContainer: {
        flex: 1,
        width: '100%',
    },
});
