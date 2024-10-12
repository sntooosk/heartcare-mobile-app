import React, { useEffect, useState } from "react";
import { FlatList, View, RefreshControl } from "react-native";
import Post from "../../models/Post";
import PostItem from "../components/PostItem";
import Header from "../components/Header";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { styles } from "./styles";
import { getPost } from "../../api/requests/post/get";

function Feed() {
  const { theme } = useTheme();
  const { authData } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getPost(authData?.token || "");
      setPosts(response.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const sharePost = async (title: string, content: string) => {
    try {
      const fileUri = FileSystem.cacheDirectory + "post.txt";
      await FileSystem.writeAsStringAsync(fileUri, `${title}\n\n${content}`);
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.COLORS.BACKGROUND }]}>
      <Header title="Campanhas" />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostItem post={item} sharePost={sharePost} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchPosts} />}
      />
    </View>
  );
}

export default Feed;
